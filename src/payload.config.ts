import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import cloudinaryPlugin from "payload-cloudinary-plugin/dist/plugins";

import {
  Users,
  Basics,
  Media,
  Awards,
  Certificates,
  Educations,
  Interests,
  Projects,
  Publications,
  Skills,
  Volunteers,
  Works,
} from "./collections";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Basics,
    Works,
    Educations,
    Skills,
    Certificates,
    Projects,
    Publications,
    Volunteers,
    Awards,
    Interests,
    Media,
  ],
  localization: {
    locales: [
      {
        label: {
          es: "Español",
          en: "Spanish",
        },
        code: "es",
      },
      {
        label: {
          es: "Inglés",
          en: "English",
        },
        code: "en",
      },
    ],
    defaultLocale: "es",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [cloudinaryPlugin()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
