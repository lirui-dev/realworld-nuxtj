export default function ({ $axios, $api, }) {
  // 获取所有分类标签
  const getTags = () => {
    return $axios({
      method: "GET",
      url: "/tags",
    })
  }


  $api.tag = {
    getTags,
  }
}