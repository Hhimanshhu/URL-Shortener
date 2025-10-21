import { Schema, model, models } from "mongoose";

interface IUrl {
  shortId: string;
  originalUrl: string;
}

const UrlSchema = new Schema<IUrl>({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

export default models.Url || model<IUrl>("Url", UrlSchema);``
