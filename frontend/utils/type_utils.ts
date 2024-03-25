import { ChatMessage, BotMessage } from "interfaces";

export function isBotMessage(message: ChatMessage): message is BotMessage {
	return (message as BotMessage).chunks !== undefined;
}
