"use client";

import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Heading } from "@react-email/heading";
import { Head } from "@react-email/head";
import { Font } from "@react-email/font";
import { Link } from "@react-email/link";
import React from "react";
import "~/styles/globals.css";

interface EmailProps {
  household: string;
  token: string;
  inviter: string;
}

export function Email({ household, token, inviter }: EmailProps) {
  return (
    <Html className="bg-[#121212]">
      <Head>
        <Font
          fontFamily="Rubik Mono One"
          fallbackFontFamily="Times New Roman"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                RubikMonoOne: ["Rubik Mono One"],
              },
            },
          },
        }}
      >
        <Body className="mx-auto  my-12 bg-[#121212] font-sans text-[#ffffff]">
          <Container className=" mx-auto w-full bg-[#121212] px-[12px] font-sans">
            <Heading className="mx-auto  text-center font-sans text-[56px] font-bold text-slate-300">
              QUARTERMASTER
            </Heading>
            <Img
              src="https://res.cloudinary.com/dxgmhaz8i/image/upload/v1687864635/forkspoondarkfix2_vtzqvz.png"
              height="110"
              width="110"
              className="mx-auto"
            />
            <Heading className="pt-4 text-center font-sans text-3xl text-slate-300">
              {inviter} has invited you to join the {household} household in
              Quartermaster!
            </Heading>
            <Text className="mt-8 text-center font-sans text-[24px] text-slate-300">
              Please login and use the code below to gain access:
            </Text>
            <Container className="mb-[20px] rounded-[10px] bg-slate-800 text-white">
              <Text className="w-full text-center font-sans text-[40px] font-semibold">
                {token ?? "testcode1234"}
              </Text>
            </Container>
            <Container className="rounded-[10px] bg-blue-600 text-slate-300 ">
              <Link
                href="https://www.quarter-master.net"
                className="mx-auto rounded-[10px] p-[16px] text-center font-sans text-[24px] font-semibold text-slate-300 "
              >
                Visit Quartermaster to get started!
              </Link>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
