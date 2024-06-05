import { PayloadHandler } from "payload/config";

interface DocResult {
  docs: any[];
}

export const getUserByNickName: PayloadHandler = async (req, res, next) => {
 
  const { payload } = req;
 
  try {

    const { email, id } = req.user;
    const { nickName  } = req.params;
    const { locale } = req.query;
 
    if (!nickName) {
      res.status(404).json({ message: "Unauthorazed" });
    }

    if (!email) {
      res.status(404).json({ message: "Unauthorazed" });
    }

    const user = await payload.find({
      collection: "users",
      where: { and: [
        { id: { equals: id } },
        { nickName: { equals: nickName } },
        { email: { equals: email } }
      ] },
    });

    if (user.docs.length === 0) {
      res.status(404).json({ message: "User not found" });
    }

    const userId = user.docs[0].id;

    const collections = [
      "basics",
      "works",
      "educations",
      "skills",
      "projects",
      "publications",
      "volunteers",
      "awards",
      "interests",
    ];

    const results = {};

    for (const collection of collections) {
      let doc: DocResult;
      doc = await payload.find({
        collection,
        where: {
          createdBy: { equals: userId },
        },
        locale: locale as string,
        limit: 0,
      });

      if (collection === "basics") {
        results["basics"] = doc.docs[0] || {};
      } else {
        results[collection] = doc.docs;
      }
    }

    res.status(200).json(results);
  } catch (error: unknown) {
    res.status(404).json({ error: error });
  }
};
