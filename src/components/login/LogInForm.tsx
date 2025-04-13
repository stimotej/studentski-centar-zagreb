import React, { useState } from "react";
import Card from "@/components/shared/Card";
import TextInput from "@/components/elements/TextInput";
import UnderConstructionTag from "@/components/shared/UnderConstructionTag";
import Button from "@/components/elements/Button";
import zod from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/providers/auth";
import { useRouter } from "next/router";
import axios from "axios";

interface LogInFormProps {
  className?: string;
}

const schema = zod.object({
  username: zod.string().min(1, "Unesi korisničko ime"),
  password: zod.string().min(1, "Unesi lozinku"),
});

const defaultValues = {
  username: "",
  password: "",
};

const LogInForm: React.FC<LogInFormProps> = (props) => {
  const router = useRouter();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState, setError, setFocus, getValues } =
    useForm({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  const [loginError, setLoginError] = useState<{
    isError: boolean;
    type?: "credentials" | "request";
  }>({ isError: false, type: "credentials" });

  const onSubmit = async (data: typeof defaultValues) => {
    setLoginError({ isError: false });
    setIsLoading(true);
    try {
      await login(data.username, data.password);
      router.push("/");
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        setLoginError({ isError: true, type: "request" });
        return;
      }

      if (error.response?.data?.data?.status === 403) {
        setLoginError({ isError: true, type: "credentials" });
      } else {
        setLoginError({ isError: true, type: "request" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={props.className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="Korisničko ime"
              errorMessage={
                errors.username ? errors.username.message : undefined
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder="Lozinka"
              type="password"
              className="mt-3"
              errorMessage={
                errors.password ? errors.password.message : undefined
              }
            />
          )}
        />
        <Button type="submit" className="mt-5" loading={isLoading}>
          Prijavi se
        </Button>
      </form>
      {/* <div className="text-sm mt-3">
        Nemaš račun?{" "}
        <Link href="#" className="text-primary">
          Registriraj se
        </Link>
      </div> */}
      <UnderConstructionTag className="mx-auto mt-6" />
    </Card>
  );
};

export default LogInForm;
