"use client";

import { useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const RegisterPage = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    console.log(data);
    try {
      const res = await registerPatient(data);
      // console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const schema = z.object({
    password: z.string().min(6).max(20),
    patient: z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      contactNumber: z.string().min(10).max(10),
      address: z.string().min(3).max(100),
    }),
  });

  const defaultValues = {
    patient: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
    },
    password: "",
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Box
              sx={{
                mt: 2,
              }}
            >
              <Typography color="red" fontWeight={600}>
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <PHForm
              submit={onSubmit}
              resolver={zodResolver(schema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <PHInput
                    label="Name"
                    size="small"
                    fullWidth={true}
                    name="patient.name"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Contact Number"
                    type="tel"
                    size="small"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <PHInput
                    label="Address"
                    type="text"
                    size="small"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Already have an account?{" "}
                <Typography
                  component="p"
                  color={"primary.main"}
                  fontWeight={300}
                >
                  <Link href="/login">Login</Link>
                </Typography>
              </Typography>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
