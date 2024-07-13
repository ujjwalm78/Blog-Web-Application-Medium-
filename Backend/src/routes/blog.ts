import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const token = c.req.header("authorization") || "";

  try {
    const decodedToken = await verify(token, c.env.JWT_SECRET);

    if (decodedToken) {
      //@ts-ignore
      c.set("userId", decodedToken.id);
      await next();
    } else {
      c.status(500);
      return c.text("Unauthorized token");
    }
  } catch (error) {
    c.status(404);
    return c.json({
      msg: "You are not logged in",
    });
  }
});
blogRouter.post("/", async (c) => {
  console.log("Here");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    },
  });

  if (blog) {
    return c.json({
      id: blog.id,
    });
  } else {
    return c.text("I am here");
  }
});
blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        content: body.content,
      },
    });
    return c.text("Blog Updated Succesfully");
  } catch (error) {
    return c.status(404);
  }
});
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      title: true,
      content: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  console.log(blogs);

  if (blogs) {
    return c.json({
      blog: blogs,
    });
  } else {
    return c.status(404);
  }
});
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({
      blog: blog,
    });
  } catch (error) {
    return c.status(404);
  }
});

export default blogRouter;
