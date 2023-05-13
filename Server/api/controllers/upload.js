import busboy from "busboy";
import { randomFillSync } from "crypto";
import fs from "fs";

export const uploadItem = async (req, res) => {
  if (req.method === "OPTIONS") {
    return res.status(200).json({ body: "OK" });
  }
  const bb = busboy({ headers: req.headers });
  const random = (() => {
    const buf = Buffer.alloc(16);
    return () => randomFillSync(buf).toString("hex");
  })();
  bb.on("file", (name, file, info) => {
    const saveTo = `https://dineease-server.vercel.app/public/${info.filename}`; //path.join(os.tmpdir(), `busboy-upload-${random()}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("close", () => {
    res.writeHead(200, { Connection: "close" });
    res.end(`That's all folks!`);
  });
  req.pipe(bb);

  //res.status(200).send("ok");
};
