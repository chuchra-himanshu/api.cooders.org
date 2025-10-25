interface LibrarySchemaInterface {
  title: string;
  logo: string;
  platformURL: string;
  slug: string;
  visibility: boolean;
  isDeleted: boolean;
}

interface ComponentSchemaInterface {
  library: ObjectId;
  title: string;
  logo: string;
  docURL: string;
  slug: string;
  visibility: boolean;
  deprecated: boolean;
}
