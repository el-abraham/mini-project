import { login } from "@/actions/auth";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { ErrorLabel } from "@/components/error-label";
import { Input } from "@/components/input";
import { IError } from "@/interfaces/common";
import { TokenService } from "@/lib/token";
import { useRef, useState } from "react";

export default function LoginPage() {
  if (TokenService.isAuthenticated()) {
    window.location.href = "/dashboard";
  }

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<IError[]>([]);

  const log = async () => {
    if (validate()) return;

    const username = usernameRef.current!.value;
    const password = passwordRef.current!.value;

    const res = await login(username, password);
    if (res) {
      TokenService.setToken(res.data.token);
      window.location.href = "/dashboard";
    } else {
      console.log("oi");
      setErrors([
        {
          message: "Invalid username or password",
          key: "general",
        },
      ]);
    }
  };

  const validate = () => {
    const errors: IError[] = [];
    if (!usernameRef.current?.value) {
      errors.push({
        message: "Username is required",
        key: "username",
      });
    }
    if (!passwordRef.current?.value) {
      errors.push({
        message: "Password is required",
        key: "password",
      });
    }
    setErrors(errors);

    return errors.length > 0;
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="w-full">
        <h3 className="text-center text-4xl font-bold text-[#1D2939]">
          Makan Kuy!
        </h3>
        <Card className="mx-auto max-w-sm w-full mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your username and password</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ErrorLabel
                message={errors.find((e) => e.key === "general")?.message}
              />
              <div>
                <h6 className="text-sm font-medium mb-1">Username</h6>
                <Input type="text" ref={usernameRef} required />
                <ErrorLabel
                  message={errors.find((e) => e.key === "username")?.message}
                />
              </div>
              <div>
                <h6 className="text-sm font-medium mb-1">Password</h6>
                <Input type="password" ref={passwordRef} required />
                <ErrorLabel
                  message={errors.find((e) => e.key === "password")?.message}
                />
              </div>
              <Button
                onClick={log}
                className="w-full bg-[#1D2939] text-white py-2.5 hover:bg-[#1D2939]/90"
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
