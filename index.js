const path = require('path');
const express = require('express');


const app = express();

app.use('',express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.get('/auth/discord', (request, response) => {
	return response.sendFile('dashboard.html', { root: '.' });
});

const port = '53134';
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
const Discord = require('discord.js');
const SelectedTheme = require('dbd-capriham-theme');

const config = require(`${__dirname}/config.json`);

const { Client } = Discord;
let client;

if (parseInt(Discord.version) < 14) client = new Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
else client = new Client({ intents: [Discord.GatewayIntentBits.Guilds] });

client.login(config.token);

(async () => {
    let DBD = require('discord-dashboard');
    await DBD.useLicense(config.dbd_license);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
        port: config.port,
        client: {
            id: config.client.id,
            secret: config.client.secret
        },
        redirectUri: `http://localhost${config.port !== 80 ? `:${config.port}` : ''}/discord/callback`,
        domain: `http://localhost${config.port !== 80 ? `:${config.port}` : ''}`,
        settings: [],
        bot: client,
        theme: SelectedTheme({
			websiteName: "Assistants",
			iconURL: 'https://assistantscenter.com/api/user/avatar/6203f8d84f31bbdc633bedb7',
			index: {
				card:{
					title: "Assistants - The center of everything",
					description: "Assistants Discord Bot management panel. Assistants Bot was created to give others the ability to do what they want. Just.<br>That's an example text.<br><br><b><i>Feel free to use HTML</i></b>",
					image: "https://www.geeklawblog.com/wp-content/uploads/sites/528/2018/12/liprofile-656x369.png",
				},
				information: {
					title: "Information",
					description: "To manage your bot, go to the <a href='/manage'>Server Management page</a>.<br><br>For a list of commands, go to the <a href='/commands'>Commands page</a>.<br><br><b><i>You can use HTML there</i></b>"
				},
				feeds: {
					title: "Feeds",
					list: [
						{
							icon: "fa fa-user",
							text: "New user registered",
							timeText: "Just now",
							bg: "bg-light-info"
						}
					]
				}
			},
			commands: {
				pageTitle: "Commands",
				table: {
					title: "List",
					subTitle: "All Assistants' commands",
					list: 
					[
						{
							commandName: "Test command",
							commandUsage: "prefix.test <arg> [op]",
							commandDescription: "Lorem ipsum dolor sth"
						}
					]
				}
			}
		})
    });
    Dashboard.init();
})();