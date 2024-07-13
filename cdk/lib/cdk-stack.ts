import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //         SecretToken: "{{resolve:secretsmanager:github-token:SecretString:::}}"

    // Arn
    const githubArn =
      "arn:aws:codeconnections:eu-west-1:351334432989:connection/a633d420-18b6-4f32-811d-da5693e3eb17";

    // conn
    const githubConn = CodePipelineSource.connection(
      "mgabs/android-pipeline",
      "main",
      { connectionArn: githubArn },
    );

    // pipeline
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "AndroidPipeline",
      synth: new ShellStep("Synth", {
        input: githubConn,
        commands: ["cd cdk", "npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
