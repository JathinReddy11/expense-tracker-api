--
-- PostgreSQL database dump
--

\restrict L4f7KRghmKFOM6fdaciAUmRrgKumzfhjNWhhkJ7X8SpLTiDiljQ2jVsTDXjQgG8

-- Dumped from database version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.20 (Ubuntu 14.20-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: jathin11
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    user_id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO jathin11;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: jathin11
--

ALTER TABLE public.categories ALTER COLUMN category_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: expenses; Type: TABLE; Schema: public; Owner: jathin11
--

CREATE TABLE public.expenses (
    expense_id integer NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    description character varying(255),
    expense_date date DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.expenses OWNER TO jathin11;

--
-- Name: expenses_expense_id_seq; Type: SEQUENCE; Schema: public; Owner: jathin11
--

ALTER TABLE public.expenses ALTER COLUMN expense_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.expenses_expense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: jathin11
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(100) NOT NULL,
    hashed_password character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO jathin11;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: jathin11
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: categories categories_user_id_name_key; Type: CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_user_id_name_key UNIQUE (user_id, name);


--
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (expense_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: idx_expenses_expense_date; Type: INDEX; Schema: public; Owner: jathin11
--

CREATE INDEX idx_expenses_expense_date ON public.expenses USING btree (expense_date);


--
-- Name: idx_expenses_user_id; Type: INDEX; Schema: public; Owner: jathin11
--

CREATE INDEX idx_expenses_user_id ON public.expenses USING btree (user_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: jathin11
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: categories fk_category_user; Type: FK CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_category_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: expenses fk_expenses_categories; Type: FK CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT fk_expenses_categories FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE CASCADE;


--
-- Name: expenses fk_expenses_user; Type: FK CONSTRAINT; Schema: public; Owner: jathin11
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict L4f7KRghmKFOM6fdaciAUmRrgKumzfhjNWhhkJ7X8SpLTiDiljQ2jVsTDXjQgG8

