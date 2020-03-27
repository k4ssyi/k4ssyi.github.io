<template>
  <v-content>
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
                  >SoftwareEngineer</span
                >

                <br />

                <span
                  :class="[
                    $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                  ]"
                  class="font-weight-black"
                  >k4ssyi</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-theme-provider>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <v-avatar class="elevation-12 mb-12" size="128">
          <v-img src="me.jpeg"></v-img>
        </v-avatar>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          {{ about }}
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          <h2>スキル</h2>
          <div>
            プログラミング言語:
            <span v-for="(lang, i) in skill.language" :key="i">
              {{ lang }},
            </span>
          </div>
          <div>
            フレームワーク:
            <span v-for="(framework, i) in skill.framework" :key="i">
              {{ framework }},
            </span>
          </div>
          <div>
            クラウド: AWS(
            <span v-for="(cloud, i) in skill.cloud[0].aws" :key="i">
              {{ cloud }},
            </span>
            )
          </div>
          <div>
            SaaS, PaaS:
            <span v-for="(saas, i) in skill.saas_paas" :key="i">
              {{ saas }}
            </span>
          </div>
          <div>
            その他:
            <span v-for="(other, i) in skill.other" :key="i">
              {{ other }}
            </span>
          </div>
        </v-responsive>

        <v-btn
          v-for="(item, i) in snss.slice(0, large ? snss.length : 2)"
          :key="i"
          :href="item.link"
          :color="item.color"
          outlined
          large
          fab
        >
          <v-icon v-text="item.icon" />
        </v-btn>
      </v-container>
    </section>

    <section id="last">
      <v-container class="text-center">
        <p>詳細な経歴は左のサイドバーからどうぞ！</p>
      </v-container>
      <div class="py-12"></div>
    </section>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      about:
        'Webエンジニア。筋トレとか健康の話題も好き。正社員、業務委託問わずお話いただけるのはありがたいのでお仕事に関するお問い合わせはTwitterのDMまでお気軽にお願いします。',
      want_to_do:
        'どうせ仕事するなら人のためになることがしたいと思ってます。技術的にはPythonまたはGoをメインでサーバサイドを極めたい。色々な技術に触れてみたい願望もあるのでチャンスがあればフルスタックに色々手を出したい。',
      snss: [
        {
          name: 'Twitter',
          icon: 'mdi-twitter',
          color: '#69A1BB',
          link: 'https://twitter.com/k4ssyi',
        },
        {
          name: 'GitHub',
          icon: 'mdi-github',
          color: '#24292e',
          link: 'https://github.com/k4ssyi',
        },
      ],
      skill: {
        language: ['Python', 'JavaScript'],
        framework: ['Django', 'Vue.js'],
        cloud: [
          {
            aws: [
              'EC2',
              'RDS(MySQL)',
              'S3',
              'Route53',
              'ECS',
              'ECR',
              'Cloud Watch',
            ],
          },
        ],
        saas_paas: ['GitHub', 'BitBucket', 'CircleCI'],
        other: ['MySQL', 'Nginx', 'gnicorn', 'Docker', 'Webpack', 'Mecab'],
      },
    }
  },
}
</script>
