export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    config.data = {
      user: "diego_orellana",
      pass: "destacameorellana",
      ...config.data
    }

  })
}