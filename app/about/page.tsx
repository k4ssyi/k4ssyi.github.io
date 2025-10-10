import { Avatar } from "radix-ui";
import Main from "@/components/layouts/main";
import Typography from "@/components/ui/typography";

export default function About() {
  return (
    <Main>
      <section>
        <Typography as="h2" className="mb-[70px]">
          About
        </Typography>
        <Typography as="p" className="mb-[50px]">
          東京でフリーランスエンジニアをしています。
          <br />
          2019年からWebアプリケーションを開発しています。
        </Typography>
        <div className="flex items-start gap-10">
          <Avatar.Root>
            <Avatar.Image className="w-[160px]" src="/rock.JPG" alt="avatar" />
            <Avatar.Fallback>RK</Avatar.Fallback>
          </Avatar.Root>
          <div className="flex-1 space-y-4">
            <div className="flex">
              <Typography as="p" className="w-[160px]">
                <strong>名前</strong>
              </Typography>
              <Typography as="p" className="mx-2">
                :
              </Typography>
              <Typography as="p">笠井 凌</Typography>
            </div>
            <div className="flex">
              <Typography as="p" className="w-[160px]">
                <strong>スキル</strong>
              </Typography>
              <Typography as="p" className="mx-2">
                :
              </Typography>
              <Typography as="p">
                TypeScript, React, Next.js, Node.js, NestJS, Python
              </Typography>
            </div>
            <div className="flex">
              <Typography as="p" className="w-[160px]">
                <strong>対応業務内容</strong>
              </Typography>
              <Typography as="p" className="mx-2">
                :
              </Typography>
              <Typography as="p">
                Webアプリケーション開発、フロント・バックエンド開発
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
}
