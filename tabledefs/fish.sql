CREATE TABLE "fish" (
    "index" smallint NOT NULL,
    "dry" boolean NOT NULL,
    "shadow" shadow_size NOT NULL,
    "rain" boolean NOT NULL,
    "name" varchar(19) NOT NULL,
    "normal_name" varchar(19) NOT NULL,
    "quote" varchar DEFAULT '[missing]',
    "price" smallint NOT NULL,
    "location" varchar NOT NULL,
    "jan" boolean[24] NOT NULL,
    "feb" boolean[24] NOT NULL,
    "mar" boolean[24] NOT NULL,
    "apr" boolean[24] NOT NULL,
    "may" boolean[24] NOT NULL,
    "jun" boolean[24] NOT NULL,
    "jul" boolean[24] NOT NULL,
    "aug" boolean[24] NOT NULL,
    "sep" boolean[24] NOT NULL,
    "oct" boolean[24] NOT NULL,
    "nov" boolean[24] NOT NULL,
    "dec" boolean[24] NOT NULL,
    PRIMARY KEY ("index")
);

