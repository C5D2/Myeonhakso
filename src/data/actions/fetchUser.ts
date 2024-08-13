'use server';

import { Session } from "next-auth";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;


export async function fetchUser(session : Session) {
	
	try {
		if(session) {
			const response = await fetch(`${SERVER}/users/${session.user?.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'client-id': `${CLIENT_ID}`,				
					'Authorization': `Bearer ${session.accessToken}`,
				},
			})
			if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
		}
		
	} catch {
		console.error('에러2222')
	}
}