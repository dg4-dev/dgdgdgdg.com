import { css } from "@emotion/react";

import type { NextPage } from "next";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import Note from "@/components/Note";
import H1 from "@/components/heading/Heading1";
import H2 from "@/components/heading/Heading2";
import H3 from "@/components/heading/Heading3";
import PricingPlanList from "@/components/workflow-and-pricing/PricingPlanList";
import WorkflowList from "@/components/workflow-and-pricing/WorkFlowList";
import { breakPoint } from "@/styles/config";

const workflowContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px 20px;
`;

const workflowItems = css`
  height: fit-content;
  position: relative;
  z-index: 0;
  padding: 20px 0;
  ${breakPoint.sp} {
    width: 100%;
  }
`;

const pricingPlanItems = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  justify-content: space-between;

  ${breakPoint.tab} {
    gap: 20px 25px;
  }
`;

const Service: NextPage = () => {
  return (
    <Layout
      title="Workflow and Pricing"
      description="Webサイトやデザインの制作の流れ、承っているプランをご紹介します。"
    >
      <H1 />

      <section id="workflow">
        <Container>
          <H2 en="Workflow" ja="制作の流れ" />
          <div className="content" css={workflowContent}>
            <div css={workflowItems}>
              <H3 en="Design" ja="デザイン" />
              <WorkflowList option="design" />
            </div>
            <div css={workflowItems}>
              <H3 en="Website" ja="ウェブサイト" />
              <WorkflowList option="web" />
            </div>
          </div>
        </Container>
      </section>

      <section id="pricingPlan">
        <Container>
          <H2 en="Pricing Plan" ja="料金プラン" />
          <Note>表示料金は基本料です。お打ち合わせ後に正式見積りとなります。</Note>
          <div className="content setplan">
            <H3 en="Set plan" ja="セットプラン" />
            <div css={pricingPlanItems}>
              <PricingPlanList option="set" />
            </div>
          </div>
          <div className="content single">
            <H3 en="Single Plan" ja="単体プラン" />
            <div css={pricingPlanItems}>
              <PricingPlanList option="single" />
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

export default Service;
