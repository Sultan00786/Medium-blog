import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
  HttpError,
  signinInput,
  signupInput,
} from "@sultanali001/medium-common";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SCERET: string;
  };
}>();

userRoute.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);
    if (!success) {
      throw new HttpError("Invalid Input", 400);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SCERET
    );

    return c.json(
      {
        status: 200,
        message: "Done to SignUp",
        jwt,
      },
      200
    );
  } catch (error) {
    return c.json({error
    });
  }
});

userRoute.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if (!success) {
      throw new HttpError("Invalid Input", 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new HttpError("User not available", 404);
    }

    if (body.password !== user.password) {
      throw new HttpError("Incorrect Password", 401);
    }

    const jwt = await sign(
      { id: user.id, email: user.email },
      c.env.JWT_SCERET
    );

    return c.json({
      status: 200,
      message: "SignIn is done, Welcom back",
      jwt,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error });
  }
});
