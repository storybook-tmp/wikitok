import rawData from '../../../eval-results/data.json';
import type { TranscriptMessage, TranscriptProps } from './transcript.types.ts';

type EvalData = {
  createdAt?: string;
  created_at?: string;
  timestamp?: string;
  id?: string;
  project?: {
    name?: string;
  };
  prompt?:
    | {
        content?: string;
        name?: string;
      }
    | string;
  variant?: {
    agent?: string;
    model?: string;
    effort?: string;
  };
  score?: {
    score?: number;
  };
  grade?: {
    baselineGhostStories?: {
      passed?: number;
      total?: number;
      successRate?: number;
    };
    buildSuccess?: boolean;
    typeCheckErrors?: number;
    ghostStories?: {
      passed?: number;
      total?: number;
      successRate?: number;
    };
    fileChanges?: Array<{
      gitStatus?: string;
      path?: string;
    }>;
  };
  screenshots?: unknown[];
  publish?: {
    screenshots?: unknown[];
  };
  execution?: {
    duration?: number;
    cost?: number | null;
  };
  docs?: {
    transcript?: Partial<TranscriptProps>;
  };
};

const data = (rawData ?? {}) as EvalData;
const rawTranscript = data.docs?.transcript;

export const emptySummaryText =
  'No eval data available yet. Run the evaluator to populate this page.';
export const emptyTranscriptText =
  'No transcript is available yet. Run the evaluator to populate this page.';
export const hasEvalData = Object.keys(data).length > 0;
export const hasTranscript = Array.isArray(rawTranscript?.messages);

export const summaryRows = [
  { label: 'Project', value: getProjectName(data) },
  { label: 'ID', value: getText(data.id), code: true },
  {
    label: 'Created at',
    value: formatTimestamp(getTimestamp(data)),
  },
  { label: 'Prompt', value: getPromptName(data.prompt) },
  { label: 'Agent', value: getText(data.variant?.agent) },
  { label: 'Model', value: getText(data.variant?.model) },
  { label: 'Effort', value: getText(data.variant?.effort) },
  { label: 'Score', value: getNumberText(data.score?.score) },
  { label: 'Build', value: getBuildStatus(data.grade?.buildSuccess) },
  {
    label: 'TypeScript errors',
    value: getNumberText(data.grade?.typeCheckErrors),
  },
  { label: 'Screenshots', value: getNumberText(getScreenshotCount(data)) },
  { label: 'Duration', value: getDurationText(data.execution?.duration) },
  { label: 'Cost', value: getCostText(data.execution?.cost) },
];

export const ghostStoryRows = [
  {
    label: 'Ghost stories before',
    value: getGhostStoriesText(data.grade?.baselineGhostStories),
  },
  {
    label: 'Ghost stories after',
    value: getGhostStoriesText(data.grade?.ghostStories),
  },
  {
    label: 'Ghost stories delta',
    value: getGhostStoryDeltaText(
      data.grade?.baselineGhostStories,
      data.grade?.ghostStories
    ),
  },
];

export const changedFiles = getChangedFiles(data.grade?.fileChanges);

export const transcriptProps: TranscriptProps = {
  prompt: getText(rawTranscript?.prompt, ''),
  promptTokenCount: getNumber(rawTranscript?.promptTokenCount),
  promptCost: getNumber(rawTranscript?.promptCost),
  messages: getMessages(rawTranscript?.messages),
};

function formatTimestamp(value?: string) {
  if (!value) {
    return '-';
  }

  const timestamp = new Date(value);

  if (Number.isNaN(timestamp.getTime())) {
    return value;
  }

  return timestamp.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'medium',
  });
}

function getBuildStatus(buildSuccess?: boolean) {
  if (buildSuccess === true) {
    return 'PASS';
  }

  if (buildSuccess === false) {
    return 'FAIL';
  }

  return '-';
}

function getGhostStoryDeltaText(
  before?: {
    passed?: number;
    successRate?: number;
  },
  after?: {
    passed?: number;
    successRate?: number;
  }
) {
  if (
    typeof before?.passed !== 'number' ||
    typeof before?.successRate !== 'number' ||
    typeof after?.passed !== 'number' ||
    typeof after?.successRate !== 'number'
  ) {
    return '-';
  }

  const passedDelta = after.passed - before.passed;
  const percentDelta = Math.round((after.successRate - before.successRate) * 100);
  const passedPrefix = passedDelta > 0 ? '+' : '';
  const percentPrefix = percentDelta > 0 ? '+' : '';

  return `${passedPrefix}${passedDelta} passed, ${percentPrefix}${percentDelta} pts`;
}

function getChangedFiles(
  fileChanges?: Array<{
    gitStatus?: string;
    path?: string;
  }>
) {
  if (!Array.isArray(fileChanges)) {
    return [];
  }

  return fileChanges
    .filter((change) => Boolean(change?.path))
    .map((change) => ({
      gitStatus: getText(change.gitStatus),
      path: getText(change.path),
    }));
}

function getCostText(cost?: number | null) {
  if (typeof cost !== 'number') {
    return '-';
  }

  return `$${cost.toFixed(2)}`;
}

function getDurationText(duration?: number) {
  if (typeof duration !== 'number') {
    return '-';
  }

  return `${Math.round(duration)}s`;
}

function getGhostStoriesText(ghostStories?: {
  passed?: number;
  total?: number;
  successRate?: number;
}) {
  if (
    typeof ghostStories?.passed !== 'number' ||
    typeof ghostStories?.total !== 'number' ||
    typeof ghostStories?.successRate !== 'number'
  ) {
    return '-';
  }

  return `${ghostStories.passed}/${ghostStories.total} (${Math.round(ghostStories.successRate * 100)}%)`;
}

function getMessages(messages?: TranscriptMessage[]) {
  return Array.isArray(messages) ? messages : [];
}

function getNumber(value: number | undefined) {
  return typeof value === 'number' ? value : 0;
}

function getNumberText(value?: number) {
  return typeof value === 'number' ? String(value) : '-';
}

function getProjectName(evalData: EvalData) {
  return getText(evalData.project?.name);
}

function getPromptName(prompt?: EvalData['prompt']) {
  if (typeof prompt === 'string') {
    return getText(prompt);
  }

  return getText(prompt?.name);
}

function getScreenshotCount(evalData: EvalData) {
  if (Array.isArray(evalData.screenshots)) {
    return evalData.screenshots.length;
  }

  if (Array.isArray(evalData.publish?.screenshots)) {
    return evalData.publish.screenshots.length;
  }

  return 0;
}

function getText(value: unknown, fallback = '-') {
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

function getTimestamp(evalData: EvalData) {
  return evalData.timestamp ?? evalData.createdAt ?? evalData.created_at;
}
