<template>
  <v-content>
    <section id="stats">
      <v-parallax
        :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
        src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
      >
        <v-container fill-height>
          <v-row class="mx-auto">
            <v-col
              v-for="[value, title] of stats"
              :key="title"
              cols="12"
              md="3"
            >
              <div class="text-center">
                <div
                  class="display-3 font-weight-black mb-4"
                  v-text="value"
                ></div>

                <div
                  class="title font-weight-regular text-uppercase"
                  v-text="title"
                ></div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-parallax>
    </section>

    <section id="hero">
      <v-row no-gutters>
        <v-theme-provider>
          <v-container fill-height>
            <v-row align="center" class="mx-auto" justify="center">
              <v-col class="text-center" cols="12" tag="h1">
                <span
                  class="font-weight-light"
                  :class="[
                    $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                  ]"
                  >直近の業務経験</span
                >
              </v-col>
              <v-col
                v-for="(project, i) in projects"
                :key="i"
                class="text-left"
                cols="12"
              >
                <h3>{{ project.title }}</h3>
                <div>{{ project.overview }}</div>
                <h3>担当業務</h3>
                <v-list-item-content
                  v-for="(assigned_work, j) in project.assigned_works"
                  :key="j"
                >
                  <v-list-item-title>{{ assigned_work }}</v-list-item-title>
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-container>
        </v-theme-provider>
      </v-row>
    </section>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        {
          title: '【自社開発】SES企業向けIT人材と案件のマッチングシステム開発',
          overview:
            '要件定義からインフラ構築、フロントエンド、バックエンド開発、その後の保守までほぼ一人で担当しました。',
          assigned_works: [
            '各設計書の作成(画面設計、DB定義書、環境構築手順、仕様書)',
            'AWS環境構築(EC2, RDS, Route53, ELB, IAMユーザ作成、設定)',
            'Docker,docker-compose.ymlの作成',
            'CircleCI環境構築',
            '監視通知基盤構築（CloudWatch、Mackerel、ChatworkAPI）',
            'webpackによるVue.js導入、Djangoとの両立化',
            'ログイン・ログアウト機能実装',
            'ソーシャルログイン(Google)機能実装',
            '管理画面の実装',
            'GmailAPIからのデータ取得とparse処理',
            '一連のCRUD機能実装',
            '検索機能実装',
            '自動テスト(Pytest)の導入、単体テスト実装',
            '定期的にAPIを叩いたり、DBの書き込みを行うバッチ処理実装',
            'Pythonの形態素解析ライブラリ(Mecab)を使用し自然言語処理を行う',
            'SQLパフォーマンス・チューニング',
          ],
          value: '',
        },
        {
          title: '【受託開発】街の情報サイト改修案件',
          overview: 'WordPressのフロント部分(jQuery)をVue.jsに改修',
          assigned_works: [
            'Webディレクター、デザイナー・コーダーとの連携',
            'GitHubFlowの導入、開発チームのリード',
            'jQueryをVue.jsへ一部置き換え作業',
            '画面動作検証',
          ],
          value: '',
        },
      ],
    }
  },
}
</script>
