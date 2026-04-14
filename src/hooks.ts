import type { Options } from "@anthropic-ai/claude-agent-sdk";

type HookConfig = NonNullable<Options["hooks"]>;

export const safetyHooks: HookConfig = {
  PreToolUse: [
    {
      matcher: "Write",
      hooks: [
        async (input) => {
          const toolInput = (input as Record<string, unknown>).tool_input as
            | Record<string, unknown>
            | undefined;
          const filePath = (toolInput?.file_path as string) ?? "";
          const blocked = [".env", ".claude/", "node_modules/", ".git/"];
          if (blocked.some((p) => filePath.includes(p))) {
            return {
              decision: "block" as const,
              reason: "AssignmentAlly cannot write to system files.",
            };
          }
          return {};
        },
      ],
    },
    {
      matcher: "WebFetch",
      hooks: [
        async () => ({
          decision: "block" as const,
          reason: "Web access is disabled for AssignmentAlly.",
        }),
      ],
    },
    {
      matcher: "WebSearch",
      hooks: [
        async () => ({
          decision: "block" as const,
          reason: "Web access is disabled for AssignmentAlly.",
        }),
      ],
    },
  ],
  Stop: [
    {
      hooks: [
        async (input) => {
          const stopInput = input as Record<string, unknown>;
          const reason = stopInput.stop_hook_active ?? "unknown";
          console.error(`[AssignmentAlly] Session complete. Stop active: ${reason}`);
          return {};
        },
      ],
    },
  ],
};
