import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const DISCORD_TOKEN = 'MTI4NDE0NDI4MzMwOTMxNDA0OA.G8aBY3.QZWJ0XVTlZ5M-r30PWFnRHYWrZIc0SjyviyD7g';
const GUILD_ID = '1164231086180683776';
const TEST_ROLE_ID = '1284189358299283517';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    // Get user by username
    const membersResponse = await fetch(
        `https://discord.com/api/v10/guilds/${GUILD_ID}/members/search?query=${username}`,
        {
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`,
            },
        }
    );

    const members = await membersResponse.json();

    if (members.length === 0) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userId = members[0].user.id;

    // Assign role to the user
    const roleResponse = await fetch(
        `https://discord.com/api/v10/guilds/${GUILD_ID}/members/${userId}/roles/${TEST_ROLE_ID}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bot ${DISCORD_TOKEN}`,
            },
        }
    );

    if (!roleResponse.ok) {
        return NextResponse.json({ error: 'Failed to assign role' }, { status: roleResponse.status });
    }

    return NextResponse.json({ success: `Role assigned to ${username}` });
}
