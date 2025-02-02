"use client";
import { ReactElement, useTransition } from "react";
import CardContainer from "@/components/CardContainer";
import useLogin from "@/hooks/useLogin";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton";
import InputFormField from "@/components/InputFormField";
import { loginAction } from "@/actions/loginAction";
import { toast } from "@/hooks/use-toast";
import useAppContext from "@/hooks/useAppContext";
import { User } from "@/types";

interface FormField {
  name: string;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
}

const formFields: FormField[] = [
  {
    name: "email",
    id: "email",
    placeholder: "example@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    id: "password",
    placeholder: "Enter your password",
    label: "Password",
    type: "password",
  },
];

export default function Login(): ReactElement {
  const { form, formData } = useLogin();
  let [isLoading, startTransition] = useTransition();
  const { pushRoute, setUser, setTotalItems } = useAppContext();

  const { email, password } = formData;

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const response = await loginAction(formData);

      if (response.status !== "success") {
        toast({
          description: response.message,
        });
        return;
      }

      toast({
        description: "Logged in successfully.",
      });

      setTotalItems(response.totalItems);
      setUser(response.user as User);
      pushRoute("/");
    } catch (error) {
      toast({
        description: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <CardContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full sm:shadow rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Login</CardTitle>
        <CardDescription className="text-gray-500">
          Let's login to your account..
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action={() => {
              startTransition(() => {
                handleSubmit();
              });
            }}
            className="space-y-5"
          >
            {formFields.map((field) => (
              <InputFormField
                key={field.name}
                control={form.control}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                label={field.label}
                errors={form.formState.errors}
                type={field.type}
              />
            ))}
            {isLoading ? (
              <LoadingButton>Submitting...</LoadingButton>
            ) : (
              <Button
                type="submit"
                size="default"
                className="w-full"
              >
                Login Now
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-0">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-sm text-foreground/85">
            Sign Up
          </Link>
        </CardDescription>
      </CardFooter>
    </CardContainer>
  );
}
