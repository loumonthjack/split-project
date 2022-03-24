
export const htmlPage = (user: {
    id: number,
    name: string,
    role: "admin" | "user"
} | null) => `
<html>
    <head>
        <meta charset="utf-8">
        <title>${user ? "Dashboard": "Homepage" }</title>
    </head>
    <body>
        <div class="container">
            <h1 class="title">Welcome ${user ? user["name"] : "to Split Access Page"}!</h1>
            <p>${user ? "Feature On" : "Feature Off"}</p>
            <form action="/toggle" method="post">
                <input type="name" id="name" name="name" placeholder="Name">
                <input type="submit" name="submit" onclick="CheckUser()" value="Check">
            </form>
            ${ user ? `<p>${user["name"]} is an ${user["role"]}</p>` : "" }

        </div>
    </body>
    <script type="text/javascript">
        const form = document.querySelector('form');
        function CheckUser() {
            return fetch('/toggle', {method: 'POST', body: new FormData(form)});
        };
    </script>
    </html>
`;

export const homePage = htmlPage(null);