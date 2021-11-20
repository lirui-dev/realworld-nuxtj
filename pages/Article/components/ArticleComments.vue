<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <!-- <div class="card">
      <div class="card-block">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img
            src="http://i.imgur.com/Qr71crq.jpg"
            class="comment-author-img"
          />
        </a>
        &nbsp;
        <a href="" class="comment-author">Jacob Schmidt</a>
        <span class="date-posted">Dec 29th</span>
      </div>
    </div> -->

    <div v-for="comment in comments" :key="comment.id" class="card">
      <div class="card-block">
        <p class="card-text">
          {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <NuxtLink :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          }
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </NuxtLink>
        &nbsp;
        <NuxtLink :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          }
        }" class="comment-author">{{comment.author.username}}</NuxtLink>
        <span class="date-posted">{{comment.updatedAt | dayjs}}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [
        /*
        {
          "id": 0,
          "createdAt": "2021-11-19T13:31:44.890Z",
          "updatedAt": "2021-11-19T13:31:44.890Z",
          "body": "string",
          "author": {
            "username": "string",
            "bio": "string",
            "image": "string",
            "following": true
          }
        }
        */
      ],
    };
  },
  async mounted() {
    const { data } = await this.$api.article.getCommentsBySlug(
      this.article.slug
    );
    // console.log(data)
    this.comments = data.comments;
  },
};
</script>

<style>
</style>