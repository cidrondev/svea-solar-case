export async function POST(request: Request) {

    const errorResponse = new Response(request.body, {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });

    const response = new Response(request.body, {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

    if (Math.floor(Math.random() * 2)) {
        return errorResponse;
    } else {
        return response;
    }
}