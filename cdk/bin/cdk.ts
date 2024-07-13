#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv";

import { PipelineStack } from "../lib/cdk-stack";

dotenv.config();

const account = process.env.ACCOUNT;
const region = process.env.REGION;

const app = new cdk.App();

new PipelineStack(app, "AndroidPipelineStack", {
  // Account & Region
  env: { account, region },
});

app.synth();
