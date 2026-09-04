import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_kind" AS ENUM('house', 'bath');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_kind" AS ENUM('house', 'bath');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_houses_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__houses_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_baths_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__baths_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_production_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__production_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_warranty_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__warranty_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_delivery_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__delivery_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_custom_design_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__custom_design_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contacts_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contacts_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT 'Администратор',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "projects_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"warm" varchar,
  	"turnkey" varchar
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"project_no" varchar,
  	"kind" "enum_projects_kind",
  	"summary" varchar,
  	"feature" varchar,
  	"rooms" varchar,
  	"bedrooms" numeric,
  	"area" varchar,
  	"size" varchar,
  	"terrace" varchar,
  	"price_warm" varchar,
  	"price_turnkey" varchar,
  	"price_note" varchar,
  	"single_column" boolean DEFAULT false,
  	"image_id" integer,
  	"plan_id" integer,
  	"legacy_image_path" varchar,
  	"legacy_plan_path" varchar,
  	"layout_description" varchar,
  	"suitable_for" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_projects_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"warm" varchar,
  	"turnkey" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_project_no" varchar,
  	"version_kind" "enum__projects_v_version_kind",
  	"version_summary" varchar,
  	"version_feature" varchar,
  	"version_rooms" varchar,
  	"version_bedrooms" numeric,
  	"version_area" varchar,
  	"version_size" varchar,
  	"version_terrace" varchar,
  	"version_price_warm" varchar,
  	"version_price_turnkey" varchar,
  	"version_price_note" varchar,
  	"version_single_column" boolean DEFAULT false,
  	"version_image_id" integer,
  	"version_plan_id" integer,
  	"version_legacy_image_path" varchar,
  	"version_legacy_plan_path" varchar,
  	"version_layout_description" varchar,
  	"version_suitable_for" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"projects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_completed_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title_ru" varchar,
  	"title_en" varchar,
  	"meta_ru" varchar,
  	"meta_en" varchar,
  	"text_ru" varchar,
  	"text_en" varchar,
  	"quote" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"content_ru" jsonb,
  	"content_en" jsonb,
  	"about_kitchen_image_id" integer,
  	"about_bedroom_image_id" integer,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_home_page_v_version_completed_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_ru" varchar,
  	"title_en" varchar,
  	"meta_ru" varchar,
  	"meta_en" varchar,
  	"text_ru" varchar,
  	"text_en" varchar,
  	"quote" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_content_ru" jsonb,
  	"version_content_en" jsonb,
  	"version_about_kitchen_image_id" integer,
  	"version_about_bedroom_image_id" integer,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_home_page_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "houses_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "houses_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "houses_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Модульные дома под ключ в Бресте — проекты и цены | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Проекты и цены модульных каркасных домов от производителя в Бресте. Дома для постоянного проживания и дачи с доставкой и монтажом по Беларуси.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Производство в Бресте · доставка по Беларуси',
  	"title" varchar DEFAULT 'Модульные дома под ключ в Бресте',
  	"lead" varchar DEFAULT 'Каталог каркасно-модульных домов для постоянного проживания, дачи и гостевого размещения. Готовые проекты, планировки, размеры и актуальные ориентировочные цены.',
  	"intro_title" varchar DEFAULT 'Дом от производителя — от проекта до монтажа',
  	"catalog_title" varchar DEFAULT 'Проекты модульных домов с ценами',
  	"_status" "enum_houses_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_houses_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_houses_page_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_houses_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Модульные дома под ключ в Бресте — проекты и цены | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Проекты и цены модульных каркасных домов от производителя в Бресте. Дома для постоянного проживания и дачи с доставкой и монтажом по Беларуси.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Производство в Бресте · доставка по Беларуси',
  	"version_title" varchar DEFAULT 'Модульные дома под ключ в Бресте',
  	"version_lead" varchar DEFAULT 'Каталог каркасно-модульных домов для постоянного проживания, дачи и гостевого размещения. Готовые проекты, планировки, размеры и актуальные ориентировочные цены.',
  	"version_intro_title" varchar DEFAULT 'Дом от производителя — от проекта до монтажа',
  	"version_catalog_title" varchar DEFAULT 'Проекты модульных домов с ценами',
  	"version__status" "enum__houses_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "baths_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "baths_page_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "baths_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Модульные бани под ключ в Бресте — проекты и цены | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Модульные бани под ключ от производителя в Бресте: проекты, планировки, комплектации и цены. Производство, доставка и монтаж по Беларуси.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Готовые проекты · производство в Бресте',
  	"title" varchar DEFAULT 'Модульные бани под ключ',
  	"lead" varchar DEFAULT 'Проекты мобильных каркасных бань с парной, моечной и комнатой отдыха. Публикуем размеры, варианты отделки и ориентировочные цены.',
  	"intro_title" varchar DEFAULT 'Готовая баня с доставкой и монтажом',
  	"catalog_title" varchar DEFAULT 'Проекты модульных бань с ценами',
  	"_status" "enum_baths_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_baths_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_baths_page_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_baths_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Модульные бани под ключ в Бресте — проекты и цены | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Модульные бани под ключ от производителя в Бресте: проекты, планировки, комплектации и цены. Производство, доставка и монтаж по Беларуси.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Готовые проекты · производство в Бресте',
  	"version_title" varchar DEFAULT 'Модульные бани под ключ',
  	"version_lead" varchar DEFAULT 'Проекты мобильных каркасных бань с парной, моечной и комнатой отдыха. Публикуем размеры, варианты отделки и ориентировочные цены.',
  	"version_intro_title" varchar DEFAULT 'Готовая баня с доставкой и монтажом',
  	"version_catalog_title" varchar DEFAULT 'Проекты модульных бань с ценами',
  	"version__status" "enum__baths_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "production_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "production_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "production_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "production_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Производство модульных домов в Бресте | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Как Modul S производит каркасно-модульные дома в Бресте: проектирование, сухой деревянный каркас, утепление, отделка, контроль и подготовка к доставке.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'О производстве',
  	"title" varchar DEFAULT 'Производство модульных домов в Бресте',
  	"lead" varchar DEFAULT 'Основные операции выполняются в производственных условиях: от сборки каркаса до отделки и проверки модулей перед отправкой.',
  	"intro_title" varchar DEFAULT 'Контролируемая сборка модулей',
  	"cta_title" varchar DEFAULT 'Хотите увидеть, как собирается ваш дом?',
  	"cta_text" varchar DEFAULT 'Расскажем о составе комплектаций и согласуем формат знакомства с производством.',
  	"show_contacts" boolean DEFAULT false,
  	"_status" "enum_production_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_production_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_production_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_production_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_production_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Производство модульных домов в Бресте | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Как Modul S производит каркасно-модульные дома в Бресте: проектирование, сухой деревянный каркас, утепление, отделка, контроль и подготовка к доставке.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'О производстве',
  	"version_title" varchar DEFAULT 'Производство модульных домов в Бресте',
  	"version_lead" varchar DEFAULT 'Основные операции выполняются в производственных условиях: от сборки каркаса до отделки и проверки модулей перед отправкой.',
  	"version_intro_title" varchar DEFAULT 'Контролируемая сборка модулей',
  	"version_cta_title" varchar DEFAULT 'Хотите увидеть, как собирается ваш дом?',
  	"version_cta_text" varchar DEFAULT 'Расскажем о составе комплектаций и согласуем формат знакомства с производством.',
  	"version_show_contacts" boolean DEFAULT false,
  	"version__status" "enum__production_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "warranty_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "warranty_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "warranty_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "warranty_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Гарантия и сервис модульных домов | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Гарантийное и послегарантийное сопровождение модульных домов Modul S: фиксация комплектации, приёмка, обращение по замечаниям и рекомендации по эксплуатации.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Гарантия и сервис',
  	"title" varchar DEFAULT 'Гарантия и сервис модульных домов',
  	"lead" varchar DEFAULT 'Условия, объём обязательств и порядок обращения фиксируются в договоре и документах к конкретному проекту.',
  	"intro_title" varchar DEFAULT 'Понятный порядок после передачи дома',
  	"cta_title" varchar DEFAULT 'Нужна консультация по обслуживанию?',
  	"cta_text" varchar DEFAULT 'Сообщите номер проекта и опишите вопрос — специалист подскажет дальнейший порядок.',
  	"show_contacts" boolean DEFAULT false,
  	"_status" "enum_warranty_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_warranty_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_warranty_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_warranty_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_warranty_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Гарантия и сервис модульных домов | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Гарантийное и послегарантийное сопровождение модульных домов Modul S: фиксация комплектации, приёмка, обращение по замечаниям и рекомендации по эксплуатации.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Гарантия и сервис',
  	"version_title" varchar DEFAULT 'Гарантия и сервис модульных домов',
  	"version_lead" varchar DEFAULT 'Условия, объём обязательств и порядок обращения фиксируются в договоре и документах к конкретному проекту.',
  	"version_intro_title" varchar DEFAULT 'Понятный порядок после передачи дома',
  	"version_cta_title" varchar DEFAULT 'Нужна консультация по обслуживанию?',
  	"version_cta_text" varchar DEFAULT 'Сообщите номер проекта и опишите вопрос — специалист подскажет дальнейший порядок.',
  	"version_show_contacts" boolean DEFAULT false,
  	"version__status" "enum__warranty_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "delivery_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "delivery_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "delivery_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "delivery_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Доставка и монтаж модульных домов по Беларуси | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Доставка модульных домов из Бреста и монтаж по Беларуси: требования к подъезду, фундаменту, крану, коммуникациям и подготовке участка.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Доставка и монтаж',
  	"title" varchar DEFAULT 'Доставка и монтаж модульных домов по Беларуси',
  	"lead" varchar DEFAULT 'Логистика рассчитывается для конкретного адреса, размеров модулей, подъезда и готовности площадки.',
  	"intro_title" varchar DEFAULT 'Что проверить до выезда модулей',
  	"cta_title" varchar DEFAULT 'Рассчитать доставку на ваш участок',
  	"cta_text" varchar DEFAULT 'Отправьте населённый пункт, точку на карте и фотографии подъезда — оценим исходные условия.',
  	"show_contacts" boolean DEFAULT false,
  	"_status" "enum_delivery_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_delivery_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_delivery_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_delivery_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_delivery_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Доставка и монтаж модульных домов по Беларуси | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Доставка модульных домов из Бреста и монтаж по Беларуси: требования к подъезду, фундаменту, крану, коммуникациям и подготовке участка.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Доставка и монтаж',
  	"version_title" varchar DEFAULT 'Доставка и монтаж модульных домов по Беларуси',
  	"version_lead" varchar DEFAULT 'Логистика рассчитывается для конкретного адреса, размеров модулей, подъезда и готовности площадки.',
  	"version_intro_title" varchar DEFAULT 'Что проверить до выезда модулей',
  	"version_cta_title" varchar DEFAULT 'Рассчитать доставку на ваш участок',
  	"version_cta_text" varchar DEFAULT 'Отправьте населённый пункт, точку на карте и фотографии подъезда — оценим исходные условия.',
  	"version_show_contacts" boolean DEFAULT false,
  	"version__status" "enum__delivery_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "custom_design_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "custom_design_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "custom_design_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "custom_design_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Индивидуальное проектирование модульных домов | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Индивидуальная планировка модульного дома под участок, состав семьи и бюджет: сбор требований, адаптация проекта, комплектация и предварительный расчёт.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Индивидуальное проектирование',
  	"title" varchar DEFAULT 'Индивидуальное проектирование модульных домов',
  	"lead" varchar DEFAULT 'Адаптируем готовую планировку или разрабатываем решение под ваш участок, сценарий проживания и допустимые размеры модулей.',
  	"intro_title" varchar DEFAULT 'От задачи к согласованной планировке',
  	"cta_title" varchar DEFAULT 'Обсудить индивидуальный дом',
  	"cta_text" varchar DEFAULT 'Пришлите эскиз, референсы или просто список пожеланий — начнём с проверки исходных данных.',
  	"show_contacts" boolean DEFAULT false,
  	"_status" "enum_custom_design_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_custom_design_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_design_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_design_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_design_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Индивидуальное проектирование модульных домов | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Индивидуальная планировка модульного дома под участок, состав семьи и бюджет: сбор требований, адаптация проекта, комплектация и предварительный расчёт.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Индивидуальное проектирование',
  	"version_title" varchar DEFAULT 'Индивидуальное проектирование модульных домов',
  	"version_lead" varchar DEFAULT 'Адаптируем готовую планировку или разрабатываем решение под ваш участок, сценарий проживания и допустимые размеры модулей.',
  	"version_intro_title" varchar DEFAULT 'От задачи к согласованной планировке',
  	"version_cta_title" varchar DEFAULT 'Обсудить индивидуальный дом',
  	"version_cta_text" varchar DEFAULT 'Пришлите эскиз, референсы или просто список пожеланий — начнём с проверки исходных данных.',
  	"version_show_contacts" boolean DEFAULT false,
  	"version__status" "enum__custom_design_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "contacts_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contacts_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "contacts_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar
  );
  
  CREATE TABLE "contacts_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_meta_title" varchar DEFAULT 'Контакты Modul S в Бресте — телефон и адрес | Modul S',
  	"seo_meta_description" varchar DEFAULT 'Контакты производителя модульных домов Modul S: телефон, Telegram, Viber, email, адрес производства в Бресте и режим работы.',
  	"seo_og_image_id" integer,
  	"eyebrow" varchar DEFAULT 'Контакты',
  	"title" varchar DEFAULT 'Контакты Modul S в Бресте — телефон и адрес',
  	"lead" varchar DEFAULT 'Обсудите проект, планировку, комплектацию, доставку и подготовку участка удобным способом.',
  	"intro_title" varchar DEFAULT 'Производство модульных домов в Бресте',
  	"cta_title" varchar DEFAULT 'Есть вопрос по проекту?',
  	"cta_text" varchar DEFAULT 'Позвоните или напишите — уточним задачу и подскажем, какие данные нужны для предварительного расчёта.',
  	"show_contacts" boolean DEFAULT true,
  	"_status" "enum_contacts_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contacts_page_v_version_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contacts_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contacts_page_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contacts_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_meta_title" varchar DEFAULT 'Контакты Modul S в Бресте — телефон и адрес | Modul S',
  	"version_seo_meta_description" varchar DEFAULT 'Контакты производителя модульных домов Modul S: телефон, Telegram, Viber, email, адрес производства в Бресте и режим работы.',
  	"version_seo_og_image_id" integer,
  	"version_eyebrow" varchar DEFAULT 'Контакты',
  	"version_title" varchar DEFAULT 'Контакты Modul S в Бресте — телефон и адрес',
  	"version_lead" varchar DEFAULT 'Обсудите проект, планировку, комплектацию, доставку и подготовку участка удобным способом.',
  	"version_intro_title" varchar DEFAULT 'Производство модульных домов в Бресте',
  	"version_cta_title" varchar DEFAULT 'Есть вопрос по проекту?',
  	"version_cta_text" varchar DEFAULT 'Позвоните или напишите — уточним задачу и подскажем, какие данные нужны для предварительного расчёта.',
  	"version_show_contacts" boolean DEFAULT true,
  	"version__status" "enum__contacts_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Modul S' NOT NULL,
  	"phone" varchar DEFAULT '+375445702727' NOT NULL,
  	"email" varchar DEFAULT 'Modulsdom@mail.ru' NOT NULL,
  	"address" varchar DEFAULT '224000, г. Брест, ул. Сябровская, 90Д' NOT NULL,
  	"default_meta_title" varchar DEFAULT 'Модульные дома и бани под ключ в Беларуси | Modul S' NOT NULL,
  	"default_meta_description" varchar DEFAULT 'Проектируем и производим модульные каркасные дома и бани под ключ в Бресте с доставкой и монтажом по всей Беларуси.' NOT NULL,
  	"social_image_id" integer,
  	"catalog_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_specs" ADD CONSTRAINT "projects_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_plan_id_media_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights" ADD CONSTRAINT "_projects_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_specs" ADD CONSTRAINT "_projects_v_version_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_plan_id_media_id_fk" FOREIGN KEY ("version_plan_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_completed_projects" ADD CONSTRAINT "home_page_completed_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_kitchen_image_id_media_id_fk" FOREIGN KEY ("about_kitchen_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_bedroom_image_id_media_id_fk" FOREIGN KEY ("about_bedroom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_completed_projects" ADD CONSTRAINT "_home_page_v_version_completed_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_about_kitchen_image_id_media_id_fk" FOREIGN KEY ("version_about_kitchen_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_about_bedroom_image_id_media_id_fk" FOREIGN KEY ("version_about_bedroom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_rels" ADD CONSTRAINT "_home_page_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_page_paragraphs" ADD CONSTRAINT "houses_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."houses_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_page_benefits" ADD CONSTRAINT "houses_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."houses_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_page" ADD CONSTRAINT "houses_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_houses_page_v_version_paragraphs" ADD CONSTRAINT "_houses_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_houses_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_houses_page_v_version_benefits" ADD CONSTRAINT "_houses_page_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_houses_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_houses_page_v" ADD CONSTRAINT "_houses_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "baths_page_paragraphs" ADD CONSTRAINT "baths_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."baths_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "baths_page_benefits" ADD CONSTRAINT "baths_page_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."baths_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "baths_page" ADD CONSTRAINT "baths_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_baths_page_v_version_paragraphs" ADD CONSTRAINT "_baths_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_baths_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_baths_page_v_version_benefits" ADD CONSTRAINT "_baths_page_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_baths_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_baths_page_v" ADD CONSTRAINT "_baths_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "production_page_paragraphs" ADD CONSTRAINT "production_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."production_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "production_page_sections_items" ADD CONSTRAINT "production_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."production_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "production_page_sections" ADD CONSTRAINT "production_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."production_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "production_page" ADD CONSTRAINT "production_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_production_page_v_version_paragraphs" ADD CONSTRAINT "_production_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_production_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_production_page_v_version_sections_items" ADD CONSTRAINT "_production_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_production_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_production_page_v_version_sections" ADD CONSTRAINT "_production_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_production_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_production_page_v" ADD CONSTRAINT "_production_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "warranty_page_paragraphs" ADD CONSTRAINT "warranty_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warranty_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warranty_page_sections_items" ADD CONSTRAINT "warranty_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warranty_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warranty_page_sections" ADD CONSTRAINT "warranty_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."warranty_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "warranty_page" ADD CONSTRAINT "warranty_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_warranty_page_v_version_paragraphs" ADD CONSTRAINT "_warranty_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warranty_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warranty_page_v_version_sections_items" ADD CONSTRAINT "_warranty_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warranty_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warranty_page_v_version_sections" ADD CONSTRAINT "_warranty_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_warranty_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_warranty_page_v" ADD CONSTRAINT "_warranty_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "delivery_page_paragraphs" ADD CONSTRAINT "delivery_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."delivery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "delivery_page_sections_items" ADD CONSTRAINT "delivery_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."delivery_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "delivery_page_sections" ADD CONSTRAINT "delivery_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."delivery_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "delivery_page" ADD CONSTRAINT "delivery_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_delivery_page_v_version_paragraphs" ADD CONSTRAINT "_delivery_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_delivery_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_delivery_page_v_version_sections_items" ADD CONSTRAINT "_delivery_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_delivery_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_delivery_page_v_version_sections" ADD CONSTRAINT "_delivery_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_delivery_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_delivery_page_v" ADD CONSTRAINT "_delivery_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_design_page_paragraphs" ADD CONSTRAINT "custom_design_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_design_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_design_page_sections_items" ADD CONSTRAINT "custom_design_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_design_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_design_page_sections" ADD CONSTRAINT "custom_design_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_design_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_design_page" ADD CONSTRAINT "custom_design_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_design_page_v_version_paragraphs" ADD CONSTRAINT "_custom_design_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_design_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_design_page_v_version_sections_items" ADD CONSTRAINT "_custom_design_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_design_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_design_page_v_version_sections" ADD CONSTRAINT "_custom_design_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_design_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_design_page_v" ADD CONSTRAINT "_custom_design_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contacts_page_paragraphs" ADD CONSTRAINT "contacts_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_page_sections_items" ADD CONSTRAINT "contacts_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_page_sections" ADD CONSTRAINT "contacts_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contacts_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contacts_page" ADD CONSTRAINT "contacts_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contacts_page_v_version_paragraphs" ADD CONSTRAINT "_contacts_page_v_version_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contacts_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contacts_page_v_version_sections_items" ADD CONSTRAINT "_contacts_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contacts_page_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contacts_page_v_version_sections" ADD CONSTRAINT "_contacts_page_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contacts_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contacts_page_v" ADD CONSTRAINT "_contacts_page_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_social_image_id_media_id_fk" FOREIGN KEY ("social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_catalog_id_media_id_fk" FOREIGN KEY ("catalog_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE INDEX "projects_specs_order_idx" ON "projects_specs" USING btree ("_order");
  CREATE INDEX "projects_specs_parent_id_idx" ON "projects_specs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE UNIQUE INDEX "projects_project_no_idx" ON "projects" USING btree ("project_no");
  CREATE INDEX "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX "projects_plan_idx" ON "projects" USING btree ("plan_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE INDEX "_projects_v_version_highlights_order_idx" ON "_projects_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_version_highlights_parent_id_idx" ON "_projects_v_version_highlights" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_specs_order_idx" ON "_projects_v_version_specs" USING btree ("_order");
  CREATE INDEX "_projects_v_version_specs_parent_id_idx" ON "_projects_v_version_specs" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_project_no_idx" ON "_projects_v" USING btree ("version_project_no");
  CREATE INDEX "_projects_v_version_version_image_idx" ON "_projects_v" USING btree ("version_image_id");
  CREATE INDEX "_projects_v_version_version_plan_idx" ON "_projects_v" USING btree ("version_plan_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_completed_projects_order_idx" ON "home_page_completed_projects" USING btree ("_order");
  CREATE INDEX "home_page_completed_projects_parent_id_idx" ON "home_page_completed_projects" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_kitchen_image_idx" ON "home_page" USING btree ("about_kitchen_image_id");
  CREATE INDEX "home_page_about_bedroom_image_idx" ON "home_page" USING btree ("about_bedroom_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_media_id_idx" ON "home_page_rels" USING btree ("media_id");
  CREATE INDEX "_home_page_v_version_completed_projects_order_idx" ON "_home_page_v_version_completed_projects" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_completed_projects_parent_id_idx" ON "_home_page_v_version_completed_projects" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_version_about_kitchen_image_idx" ON "_home_page_v" USING btree ("version_about_kitchen_image_id");
  CREATE INDEX "_home_page_v_version_version_about_bedroom_image_idx" ON "_home_page_v" USING btree ("version_about_bedroom_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_rels_order_idx" ON "_home_page_v_rels" USING btree ("order");
  CREATE INDEX "_home_page_v_rels_parent_idx" ON "_home_page_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_page_v_rels_path_idx" ON "_home_page_v_rels" USING btree ("path");
  CREATE INDEX "_home_page_v_rels_media_id_idx" ON "_home_page_v_rels" USING btree ("media_id");
  CREATE INDEX "houses_page_paragraphs_order_idx" ON "houses_page_paragraphs" USING btree ("_order");
  CREATE INDEX "houses_page_paragraphs_parent_id_idx" ON "houses_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "houses_page_benefits_order_idx" ON "houses_page_benefits" USING btree ("_order");
  CREATE INDEX "houses_page_benefits_parent_id_idx" ON "houses_page_benefits" USING btree ("_parent_id");
  CREATE INDEX "houses_page_seo_seo_og_image_idx" ON "houses_page" USING btree ("seo_og_image_id");
  CREATE INDEX "houses_page__status_idx" ON "houses_page" USING btree ("_status");
  CREATE INDEX "_houses_page_v_version_paragraphs_order_idx" ON "_houses_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_houses_page_v_version_paragraphs_parent_id_idx" ON "_houses_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_houses_page_v_version_benefits_order_idx" ON "_houses_page_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_houses_page_v_version_benefits_parent_id_idx" ON "_houses_page_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_houses_page_v_version_seo_version_seo_og_image_idx" ON "_houses_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_houses_page_v_version_version__status_idx" ON "_houses_page_v" USING btree ("version__status");
  CREATE INDEX "_houses_page_v_created_at_idx" ON "_houses_page_v" USING btree ("created_at");
  CREATE INDEX "_houses_page_v_updated_at_idx" ON "_houses_page_v" USING btree ("updated_at");
  CREATE INDEX "_houses_page_v_latest_idx" ON "_houses_page_v" USING btree ("latest");
  CREATE INDEX "baths_page_paragraphs_order_idx" ON "baths_page_paragraphs" USING btree ("_order");
  CREATE INDEX "baths_page_paragraphs_parent_id_idx" ON "baths_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "baths_page_benefits_order_idx" ON "baths_page_benefits" USING btree ("_order");
  CREATE INDEX "baths_page_benefits_parent_id_idx" ON "baths_page_benefits" USING btree ("_parent_id");
  CREATE INDEX "baths_page_seo_seo_og_image_idx" ON "baths_page" USING btree ("seo_og_image_id");
  CREATE INDEX "baths_page__status_idx" ON "baths_page" USING btree ("_status");
  CREATE INDEX "_baths_page_v_version_paragraphs_order_idx" ON "_baths_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_baths_page_v_version_paragraphs_parent_id_idx" ON "_baths_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_baths_page_v_version_benefits_order_idx" ON "_baths_page_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_baths_page_v_version_benefits_parent_id_idx" ON "_baths_page_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_baths_page_v_version_seo_version_seo_og_image_idx" ON "_baths_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_baths_page_v_version_version__status_idx" ON "_baths_page_v" USING btree ("version__status");
  CREATE INDEX "_baths_page_v_created_at_idx" ON "_baths_page_v" USING btree ("created_at");
  CREATE INDEX "_baths_page_v_updated_at_idx" ON "_baths_page_v" USING btree ("updated_at");
  CREATE INDEX "_baths_page_v_latest_idx" ON "_baths_page_v" USING btree ("latest");
  CREATE INDEX "production_page_paragraphs_order_idx" ON "production_page_paragraphs" USING btree ("_order");
  CREATE INDEX "production_page_paragraphs_parent_id_idx" ON "production_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "production_page_sections_items_order_idx" ON "production_page_sections_items" USING btree ("_order");
  CREATE INDEX "production_page_sections_items_parent_id_idx" ON "production_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "production_page_sections_order_idx" ON "production_page_sections" USING btree ("_order");
  CREATE INDEX "production_page_sections_parent_id_idx" ON "production_page_sections" USING btree ("_parent_id");
  CREATE INDEX "production_page_seo_seo_og_image_idx" ON "production_page" USING btree ("seo_og_image_id");
  CREATE INDEX "production_page__status_idx" ON "production_page" USING btree ("_status");
  CREATE INDEX "_production_page_v_version_paragraphs_order_idx" ON "_production_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_production_page_v_version_paragraphs_parent_id_idx" ON "_production_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_production_page_v_version_sections_items_order_idx" ON "_production_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_production_page_v_version_sections_items_parent_id_idx" ON "_production_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_production_page_v_version_sections_order_idx" ON "_production_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_production_page_v_version_sections_parent_id_idx" ON "_production_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_production_page_v_version_seo_version_seo_og_image_idx" ON "_production_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_production_page_v_version_version__status_idx" ON "_production_page_v" USING btree ("version__status");
  CREATE INDEX "_production_page_v_created_at_idx" ON "_production_page_v" USING btree ("created_at");
  CREATE INDEX "_production_page_v_updated_at_idx" ON "_production_page_v" USING btree ("updated_at");
  CREATE INDEX "_production_page_v_latest_idx" ON "_production_page_v" USING btree ("latest");
  CREATE INDEX "warranty_page_paragraphs_order_idx" ON "warranty_page_paragraphs" USING btree ("_order");
  CREATE INDEX "warranty_page_paragraphs_parent_id_idx" ON "warranty_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "warranty_page_sections_items_order_idx" ON "warranty_page_sections_items" USING btree ("_order");
  CREATE INDEX "warranty_page_sections_items_parent_id_idx" ON "warranty_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "warranty_page_sections_order_idx" ON "warranty_page_sections" USING btree ("_order");
  CREATE INDEX "warranty_page_sections_parent_id_idx" ON "warranty_page_sections" USING btree ("_parent_id");
  CREATE INDEX "warranty_page_seo_seo_og_image_idx" ON "warranty_page" USING btree ("seo_og_image_id");
  CREATE INDEX "warranty_page__status_idx" ON "warranty_page" USING btree ("_status");
  CREATE INDEX "_warranty_page_v_version_paragraphs_order_idx" ON "_warranty_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_warranty_page_v_version_paragraphs_parent_id_idx" ON "_warranty_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_warranty_page_v_version_sections_items_order_idx" ON "_warranty_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_warranty_page_v_version_sections_items_parent_id_idx" ON "_warranty_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_warranty_page_v_version_sections_order_idx" ON "_warranty_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_warranty_page_v_version_sections_parent_id_idx" ON "_warranty_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_warranty_page_v_version_seo_version_seo_og_image_idx" ON "_warranty_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_warranty_page_v_version_version__status_idx" ON "_warranty_page_v" USING btree ("version__status");
  CREATE INDEX "_warranty_page_v_created_at_idx" ON "_warranty_page_v" USING btree ("created_at");
  CREATE INDEX "_warranty_page_v_updated_at_idx" ON "_warranty_page_v" USING btree ("updated_at");
  CREATE INDEX "_warranty_page_v_latest_idx" ON "_warranty_page_v" USING btree ("latest");
  CREATE INDEX "delivery_page_paragraphs_order_idx" ON "delivery_page_paragraphs" USING btree ("_order");
  CREATE INDEX "delivery_page_paragraphs_parent_id_idx" ON "delivery_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "delivery_page_sections_items_order_idx" ON "delivery_page_sections_items" USING btree ("_order");
  CREATE INDEX "delivery_page_sections_items_parent_id_idx" ON "delivery_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "delivery_page_sections_order_idx" ON "delivery_page_sections" USING btree ("_order");
  CREATE INDEX "delivery_page_sections_parent_id_idx" ON "delivery_page_sections" USING btree ("_parent_id");
  CREATE INDEX "delivery_page_seo_seo_og_image_idx" ON "delivery_page" USING btree ("seo_og_image_id");
  CREATE INDEX "delivery_page__status_idx" ON "delivery_page" USING btree ("_status");
  CREATE INDEX "_delivery_page_v_version_paragraphs_order_idx" ON "_delivery_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_delivery_page_v_version_paragraphs_parent_id_idx" ON "_delivery_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_delivery_page_v_version_sections_items_order_idx" ON "_delivery_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_delivery_page_v_version_sections_items_parent_id_idx" ON "_delivery_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_delivery_page_v_version_sections_order_idx" ON "_delivery_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_delivery_page_v_version_sections_parent_id_idx" ON "_delivery_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_delivery_page_v_version_seo_version_seo_og_image_idx" ON "_delivery_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_delivery_page_v_version_version__status_idx" ON "_delivery_page_v" USING btree ("version__status");
  CREATE INDEX "_delivery_page_v_created_at_idx" ON "_delivery_page_v" USING btree ("created_at");
  CREATE INDEX "_delivery_page_v_updated_at_idx" ON "_delivery_page_v" USING btree ("updated_at");
  CREATE INDEX "_delivery_page_v_latest_idx" ON "_delivery_page_v" USING btree ("latest");
  CREATE INDEX "custom_design_page_paragraphs_order_idx" ON "custom_design_page_paragraphs" USING btree ("_order");
  CREATE INDEX "custom_design_page_paragraphs_parent_id_idx" ON "custom_design_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "custom_design_page_sections_items_order_idx" ON "custom_design_page_sections_items" USING btree ("_order");
  CREATE INDEX "custom_design_page_sections_items_parent_id_idx" ON "custom_design_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "custom_design_page_sections_order_idx" ON "custom_design_page_sections" USING btree ("_order");
  CREATE INDEX "custom_design_page_sections_parent_id_idx" ON "custom_design_page_sections" USING btree ("_parent_id");
  CREATE INDEX "custom_design_page_seo_seo_og_image_idx" ON "custom_design_page" USING btree ("seo_og_image_id");
  CREATE INDEX "custom_design_page__status_idx" ON "custom_design_page" USING btree ("_status");
  CREATE INDEX "_custom_design_page_v_version_paragraphs_order_idx" ON "_custom_design_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_custom_design_page_v_version_paragraphs_parent_id_idx" ON "_custom_design_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_custom_design_page_v_version_sections_items_order_idx" ON "_custom_design_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_custom_design_page_v_version_sections_items_parent_id_idx" ON "_custom_design_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_design_page_v_version_sections_order_idx" ON "_custom_design_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_custom_design_page_v_version_sections_parent_id_idx" ON "_custom_design_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_custom_design_page_v_version_seo_version_seo_og_image_idx" ON "_custom_design_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_custom_design_page_v_version_version__status_idx" ON "_custom_design_page_v" USING btree ("version__status");
  CREATE INDEX "_custom_design_page_v_created_at_idx" ON "_custom_design_page_v" USING btree ("created_at");
  CREATE INDEX "_custom_design_page_v_updated_at_idx" ON "_custom_design_page_v" USING btree ("updated_at");
  CREATE INDEX "_custom_design_page_v_latest_idx" ON "_custom_design_page_v" USING btree ("latest");
  CREATE INDEX "contacts_page_paragraphs_order_idx" ON "contacts_page_paragraphs" USING btree ("_order");
  CREATE INDEX "contacts_page_paragraphs_parent_id_idx" ON "contacts_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "contacts_page_sections_items_order_idx" ON "contacts_page_sections_items" USING btree ("_order");
  CREATE INDEX "contacts_page_sections_items_parent_id_idx" ON "contacts_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "contacts_page_sections_order_idx" ON "contacts_page_sections" USING btree ("_order");
  CREATE INDEX "contacts_page_sections_parent_id_idx" ON "contacts_page_sections" USING btree ("_parent_id");
  CREATE INDEX "contacts_page_seo_seo_og_image_idx" ON "contacts_page" USING btree ("seo_og_image_id");
  CREATE INDEX "contacts_page__status_idx" ON "contacts_page" USING btree ("_status");
  CREATE INDEX "_contacts_page_v_version_paragraphs_order_idx" ON "_contacts_page_v_version_paragraphs" USING btree ("_order");
  CREATE INDEX "_contacts_page_v_version_paragraphs_parent_id_idx" ON "_contacts_page_v_version_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_contacts_page_v_version_sections_items_order_idx" ON "_contacts_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_contacts_page_v_version_sections_items_parent_id_idx" ON "_contacts_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_contacts_page_v_version_sections_order_idx" ON "_contacts_page_v_version_sections" USING btree ("_order");
  CREATE INDEX "_contacts_page_v_version_sections_parent_id_idx" ON "_contacts_page_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_contacts_page_v_version_seo_version_seo_og_image_idx" ON "_contacts_page_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_contacts_page_v_version_version__status_idx" ON "_contacts_page_v" USING btree ("version__status");
  CREATE INDEX "_contacts_page_v_created_at_idx" ON "_contacts_page_v" USING btree ("created_at");
  CREATE INDEX "_contacts_page_v_updated_at_idx" ON "_contacts_page_v" USING btree ("updated_at");
  CREATE INDEX "_contacts_page_v_latest_idx" ON "_contacts_page_v" USING btree ("latest");
  CREATE INDEX "site_settings_social_image_idx" ON "site_settings" USING btree ("social_image_id");
  CREATE INDEX "site_settings_catalog_idx" ON "site_settings" USING btree ("catalog_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_specs" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "_projects_v_version_highlights" CASCADE;
  DROP TABLE "_projects_v_version_specs" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_completed_projects" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TABLE "_home_page_v_version_completed_projects" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "_home_page_v_rels" CASCADE;
  DROP TABLE "houses_page_paragraphs" CASCADE;
  DROP TABLE "houses_page_benefits" CASCADE;
  DROP TABLE "houses_page" CASCADE;
  DROP TABLE "_houses_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_houses_page_v_version_benefits" CASCADE;
  DROP TABLE "_houses_page_v" CASCADE;
  DROP TABLE "baths_page_paragraphs" CASCADE;
  DROP TABLE "baths_page_benefits" CASCADE;
  DROP TABLE "baths_page" CASCADE;
  DROP TABLE "_baths_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_baths_page_v_version_benefits" CASCADE;
  DROP TABLE "_baths_page_v" CASCADE;
  DROP TABLE "production_page_paragraphs" CASCADE;
  DROP TABLE "production_page_sections_items" CASCADE;
  DROP TABLE "production_page_sections" CASCADE;
  DROP TABLE "production_page" CASCADE;
  DROP TABLE "_production_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_production_page_v_version_sections_items" CASCADE;
  DROP TABLE "_production_page_v_version_sections" CASCADE;
  DROP TABLE "_production_page_v" CASCADE;
  DROP TABLE "warranty_page_paragraphs" CASCADE;
  DROP TABLE "warranty_page_sections_items" CASCADE;
  DROP TABLE "warranty_page_sections" CASCADE;
  DROP TABLE "warranty_page" CASCADE;
  DROP TABLE "_warranty_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_warranty_page_v_version_sections_items" CASCADE;
  DROP TABLE "_warranty_page_v_version_sections" CASCADE;
  DROP TABLE "_warranty_page_v" CASCADE;
  DROP TABLE "delivery_page_paragraphs" CASCADE;
  DROP TABLE "delivery_page_sections_items" CASCADE;
  DROP TABLE "delivery_page_sections" CASCADE;
  DROP TABLE "delivery_page" CASCADE;
  DROP TABLE "_delivery_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_delivery_page_v_version_sections_items" CASCADE;
  DROP TABLE "_delivery_page_v_version_sections" CASCADE;
  DROP TABLE "_delivery_page_v" CASCADE;
  DROP TABLE "custom_design_page_paragraphs" CASCADE;
  DROP TABLE "custom_design_page_sections_items" CASCADE;
  DROP TABLE "custom_design_page_sections" CASCADE;
  DROP TABLE "custom_design_page" CASCADE;
  DROP TABLE "_custom_design_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_custom_design_page_v_version_sections_items" CASCADE;
  DROP TABLE "_custom_design_page_v_version_sections" CASCADE;
  DROP TABLE "_custom_design_page_v" CASCADE;
  DROP TABLE "contacts_page_paragraphs" CASCADE;
  DROP TABLE "contacts_page_sections_items" CASCADE;
  DROP TABLE "contacts_page_sections" CASCADE;
  DROP TABLE "contacts_page" CASCADE;
  DROP TABLE "_contacts_page_v_version_paragraphs" CASCADE;
  DROP TABLE "_contacts_page_v_version_sections_items" CASCADE;
  DROP TABLE "_contacts_page_v_version_sections" CASCADE;
  DROP TABLE "_contacts_page_v" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_projects_kind";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_kind";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_houses_page_status";
  DROP TYPE "public"."enum__houses_page_v_version_status";
  DROP TYPE "public"."enum_baths_page_status";
  DROP TYPE "public"."enum__baths_page_v_version_status";
  DROP TYPE "public"."enum_production_page_status";
  DROP TYPE "public"."enum__production_page_v_version_status";
  DROP TYPE "public"."enum_warranty_page_status";
  DROP TYPE "public"."enum__warranty_page_v_version_status";
  DROP TYPE "public"."enum_delivery_page_status";
  DROP TYPE "public"."enum__delivery_page_v_version_status";
  DROP TYPE "public"."enum_custom_design_page_status";
  DROP TYPE "public"."enum__custom_design_page_v_version_status";
  DROP TYPE "public"."enum_contacts_page_status";
  DROP TYPE "public"."enum__contacts_page_v_version_status";`)
}
