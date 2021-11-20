<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isLogin" class="nav-item">
                <NuxtLink
                  :to="{
                    name: 'home',
                    query: {
                      tab: isLogin ? 'your-feed' : undefined,
                    },
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'your-feed',
                  }"
                  >Your Feed</NuxtLink
                >
              </li>
              <li class="nav-item">
                <NuxtLink
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global-feed',
                    },
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'global-feed',
                  }"
                  >Global Feed</NuxtLink
                >
              </li>
              <li v-if="tag" class="nav-item">
                <NuxtLink
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                  >{{ tag }} Tag</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div
            v-for="article in articles"
            :key="article.slug"
            class="article-preview"
          >
            <div class="article-meta">
              <NuxtLink
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></NuxtLink>
              <div class="info">
                <NuxtLink
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</NuxtLink
                >
                <span class="date">{{
                  article.updatedAt | dayjs("MMM DD")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                }"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <NuxtLink
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </NuxtLink>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <NuxtLink
                v-for="tagName in tags"
                :key="tagName"
                :to="{
                  name: 'home',
                  query: {
                    tag: tagName,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
                :class="{
                  'tag-success': tag === tagName,
                }"
                >{{ tagName }}</NuxtLink
              >
            </div>
          </div>
        </div>

        <nav>
          <ul class="pagination">
            <li
              v-for="pageNum in pageTotal"
              :key="pageNum"
              class="page-item"
              :class="{
                active: pageNum === page,
              }"
            >
              <NuxtLink
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: pageNum,
                    tag,
                    tab,
                  },
                }"
                >{{ pageNum }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      articles: [
        /*
        {
          "slug": "string",
          "title": "string",
          "description": "string",
          "body": "string",
          "tagList": [
            "string"
          ],
          "createdAt": "2021-11-18T21:28:44.961Z",
          "updatedAt": "2021-11-18T21:28:44.961Z",
          "favorited": true,
          "favoritesCount": 0,
          "author": {
            "username": "string",
            "bio": "string",
            "image": "string",
            "following": true
        }
        */
      ],
      articlesCount: 0,
      pageLimit: 20,

      tags: [
        /*
        "tagName"
        */
      ],
    };
  },
  computed: {
    page() {
      return Number.parseInt(this.$route.query.page || 1);
    },
    pageTotal() {
      return Math.ceil(this.articlesCount / this.pageLimit);
    },
    tag() {
      return this.$route.query.tag;
    },
    isLogin() {
      return this.$store.user;
    },
    tab() {
      return this.$route.query.tab || "global-feed";
    },
  },
  watch: {
    "$route.query": "$fetch",
  },
  async fetch() {
    // 获取后端数据
    const getArticles =
      this.isLogin && this.tab === "your-feed"
        ? this.$api.article.getFeedArticles
        : this.$api.article.getArticles;
    const getTags = this.$api.tag.getTags;

    const [articleRes, tagRes] = await Promise.all([
      // 获取文章数据
      getArticles({
        limit: this.pageLimit,
        offset: (this.page - 1) * this.pageLimit,
        tag: this.$route.query.tag,
      }),
      // 获取标签数据
      getTags(),
    ]);
    // console.log(articleRes.data, tagRes.data);
    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    // 数据预处理
    // 1. 增加点赞状态
    articles.forEach(article => { article.favoriteDisabled = false })

    // 数据加载数据
    this.articles = articles;
    this.articlesCount = articlesCount;
    this.tags = tags;
  },
  methods: {
    async onFavorite(article) {
      // console.log(article);
      if (article.favorited) {
        // 取消点赞
        try {
          await this.$api.article.deleteFavorite(article);
          article.favorited = false;
          article.favoritesCount--
        } catch (e) {}
      } else {
        // 添加点赞
        try {
          await this.$api.article.postFavorite(article);
          article.favorited = true;
          article.favoritesCount++
        } catch (e) {}
      }
    },
  },
};
</script>

<style>
</style>