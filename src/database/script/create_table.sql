CREATE TABLE public.urls
(
    id serial NOT NULL,
    short_url character varying(30) NOT NULL,
    full_url character varying(255) NOT NULL,
    validation_date date NOT NULL,
    PRIMARY KEY (id)
);