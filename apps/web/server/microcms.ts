import "server-only";

import { createClient } from "microcms-js-sdk";
import { getMicrocmsEnv } from "@/env.server";

export const openMicrocms = () => createClient(getMicrocmsEnv());
