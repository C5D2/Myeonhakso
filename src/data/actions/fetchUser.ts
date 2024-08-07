import { UserData } from "@/types";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_CARD_LIMIT;

export async function fetchUser(user: UserData) {
	try {
		const response = await fetch(`${SERVER}/`)
	} catch {

	}
}