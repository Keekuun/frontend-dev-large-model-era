import { type TimelineStep, timelineConfig } from "./timeline.config";
import jd from "../prompt/jd.prompt";
import roleAndTask from "../prompt/roleAndTask.prompt";
import basicRule from "../prompt/basicRule.prompt";

type TimelineContext = TimelineStep & {
  currentTimeline: string;
  nextTimelineAction: string;
}

interface ContextConfig {
  basicRule: string;
  jobDescription: string;
  roleAndTask: string;
  currentTimelineContext: TimelineContext;
}

function formatContextConfig(contextConfig: ContextConfig): string {
  return `# 基本原则
${contextConfig.basicRule}

# 你是谁
${contextConfig.roleAndTask}

# 你招聘的角色
${contextConfig.jobDescription}

# 当前面试阶段信息

## 当前时间（minutes)
${contextConfig.currentTimelineContext.currentTimeline}

## 开始时间（minutes)
${contextConfig.currentTimelineContext.startTime}

## 结束时间（minutes)
${contextConfig.currentTimelineContext.endTime}

## 当前应聚焦问题
${contextConfig.currentTimelineContext.focus}

## 当前阶段任务
${contextConfig.currentTimelineContext.prompt}

## 下一阶段
${contextConfig.currentTimelineContext.nextTimelineAction}
`;
}

export function getContext(timeline: number): string {
  for(let i = 0; i < timelineConfig.steps.length; i++) {
    const step = timelineConfig.steps[i];
    const nextTimelineAction = i === timelineConfig.steps.length - 1 ? '结束面试' : timelineConfig.steps[i + 1].focus;
    if(timeline >= step.startTime && timeline <= step.endTime) {
      return formatContextConfig({
        basicRule,
        jobDescription: jd,
        roleAndTask: roleAndTask,
        currentTimelineContext: {
          ...step,
          currentTimeline: timeline.toFixed(2),
          nextTimelineAction,
        }
      });
    };
  }
  return formatContextConfig({
    basicRule,
    jobDescription: jd,
    roleAndTask: roleAndTask,
    currentTimelineContext: {
      ...timelineConfig.steps[timelineConfig.steps.length - 1],
      currentTimeline: timeline.toFixed(2),
      nextTimelineAction: '结束面试',
    }
  });
}