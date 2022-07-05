import aws from "aws-sdk";

const s3 = new aws.S3();

const deleteImageFromS3 = (key: string) => s3
  .deleteObject({
    Bucket: process.env.BUCKET_NAME || "",
    Key: key,
  }, (response) => {
    console.log(response);
  });

export { deleteImageFromS3 }