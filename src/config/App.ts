type AppUrlConfig = {
  url: '?redirect=https://dlombello-test.netlify.app/token' | '';
}

export default {
  url: process.env.APP_WEB_URL,
} as AppUrlConfig;