export default function ({ $axios, $api, }) {
  // 获取公共文章列表
  const getArticles = (params) => {
    return $axios({
      method: "GET",
      url: "/articles",
      params,
    })
  }
  // 获取用户关注文章列表
  const getFeedArticles = (params) => {
    return $axios({
      method: "GET",
      url: "/articles/feed",
      params,
    })
  }
  // 获取单篇文章
  const getBySlug = (slug) => {
    return $axios({
      method: 'GET',
      url: `/articles/${slug}`
    })
  }
  // 修改单篇文章
  const putBySlug = (slug, params) => {
    return $axios({
      method: 'PUT',
      url: `/articles/${slug}`,
      params,
    })
  }
  // 删除单篇文章
  const deleteBySlug = (slug) => {
    return $axios({
      method: 'DELETE',
      url: `/articles/${slug}`,
    })
  }
  // 点赞文章
  const postFavorite = (article) => {
    if (typeof article === 'string') {
      article = {
        slug: article
      }
    }
    return $axios({
      method: "POST",
      url: `/articles/${article.slug}/favorite`,
    })
  }
  // 取消文章点赞
  const deleteFavorite = (article) => {
    if (typeof article === 'string') {
      article = {
        slug: article
      }
    }
    return $axios({
      method: "DELETE",
      url: `/articles/${article.slug}/favorite`,
    })
  }
  // 获取文章评论
  const getCommentsBySlug = (slug) => {
    return $axios({
      method: 'GET',
      url: `/articles/${slug}/comments`
    })
  }
  // 提交文章评论
  const postCommentsBySlug = (slug, data) => {
    return $axios({
      method: 'POST',
      url: `/articles/${slug}/comments`,
      data,
    })
  }
  const deleteCommentsBySlugAndId = (slug, id) => {
    return $axios({
      method: 'DELETE',
      url: `/articles/${slug}/comments/${id}`,
    })
  }

  $api.article = {
    getArticles,
    getFeedArticles,
    getBySlug,
    putBySlug,
    deleteBySlug,
    postFavorite,
    deleteFavorite,
    getCommentsBySlug,
    postCommentsBySlug,
    deleteCommentsBySlugAndId,
  }
}
