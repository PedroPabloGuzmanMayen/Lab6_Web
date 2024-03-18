create table if not exists blog_posts(
    id serial primary key,
    title text not null,
    content text not null,
    created_at date not null default now(),
    banner text not null,
    author text not null

);