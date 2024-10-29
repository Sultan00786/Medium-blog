import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  updateBlogInput,
  creatBlogInput,
  HttpError,
} from "@sultanali001/medium-common";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SCERET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

blogRoute.use("/*", async (c, next) => {
  try {
    const token = c.req.header("authorization") || "";
    const user = await verify(token, c.env.JWT_SCERET);

    console.log("user ojjjjjjjjjjjjjject: ", user);

    if (user.id) {
      // @ts-ignore
      c.set("authorId", user.id);
      await next();
    } else throw new HttpError("Invalid Tokken", 400);
  } catch (error) {
    return c.json({
      error,
    });
  }
});

blogRoute.post("/createBlog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const authorId = c.get("authorId");
    const body = await c.req.json();

    const { success } = creatBlogInput.safeParse(body);

    if (!success) {
      throw new HttpError("Invalid Input", 400);
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        publish: body.publish ? body.publish : false,
        authorId: Number(authorId),
      },
    });

    return c.json({
      message: "New Blog is created ",
      blogId: blog.id,
      authorId: blog.authorId,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

blogRoute.put("/updateBlog/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const authorId = c.get("authorId");
    const id = c.req.param("id");

    const { success } = updateBlogInput.safeParse(body);

    if (!success) {
      throw new HttpError("Invalid Input", 400);
    }

    const blog = await prisma.post.update({
      data: {
        title: body.title,
        content: body.content,
      },
      where: {
        id: Number(id),
        authorId: Number(authorId),
      },
    });

    return c.json({
      message: "Blog is updated successfully ",
      blogId: blog.id,
      authorId: blog.authorId,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});

blogRoute.get("/getBlog/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const blog = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    return c.json({
      message: "Done to fetch the data",
      blog,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      message: "Error occure while fetching the blog data",
      error,
    });
  }
});

// todo: Pagenation Functionlity is still remaining
blogRoute.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findMany();

    return c.json({
      message: "Here is All Blog !!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      message: "Error occure while fetching all blog data",
      error,
    });
  }
});
