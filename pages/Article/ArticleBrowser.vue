<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <ArticleMeta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div v-html="article.body" class="col-md-12"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <ArticleComments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'

import ArticleMeta from './components/ArticleMeta'
import ArticleComments from './components/ArticleComments'

export default {
  name: "ArticleBrowser",
  components: {
    ArticleMeta,
    ArticleComments,
  },
  data() {
    return {
      article: {},
    }
  },
  computed: {
    articleSlug() {
      return this.$route.params.slug
    },
  },
  watch: {
    "$route.params": "$fetch",
  },
  async fetch() {
    // 获取后端数据
    const { data } = await this.$api.article.getBySlug(this.articleSlug);
    // console.log(data);

    // 数据预处理
    const md = new MarkdownIt();
    data.article.body = md.render(data.article.body)

    // 修改前端状态
    this.article = data.article
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description,
        }
      ],
    }
  },
};
</script>

<style>
</style>