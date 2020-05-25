const { BrowserWindow, ipcMain, Menu, app, shell, dialog } = require('electron');

let template: any[] = [
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: (item: any, focusedWindow: { id: number; reload: () => void; }) => {
                    if (focusedWindow) {
                        // on reload, start fresh and close any old
                        // open secondary windows
                        if (focusedWindow.id === 1) {
                            BrowserWindow.getAllWindows().forEach((win: { id: number; close: () => void; }) => {
                                if (win.id > 1) win.close();
                            });
                        }
                        focusedWindow.reload();
                    }
                }
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F';
                    } else {
                        return 'F11';
                    }
                })(),
                click: (item: any, focusedWindow: { setFullScreen: (arg0: boolean) => void; isFullScreen: () => any; }) => {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: (() => {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I';
                    } else {
                        return 'Ctrl+Shift+I';
                    }
                })(),
                click: (item: any, focusedWindow: { toggleDevTools: () => void; }) => {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'App Menu Demo',
                click: function (item: any, focusedWindow: any) {
                    if (focusedWindow) {
                        const options = {
                            type: 'info',
                            title: 'Application Menu Demo',
                            buttons: ['Ok'],
                            message:
                                'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
                        };
                        dialog.showMessageBox(focusedWindow, options, function () { });
                    }
                }
            }
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                type: 'separator'
            },
            {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: () => {
                    app.emit('activate');
                }
            }
        ]
    },
    {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: () => {
                    shell.openExternal('http://electron.atom.io');
                }
            }
        ]
    },
    {
        label: 'Tool',
        submenu: [
            {
                label: '后退',
                click: (item: any, focusedWindow: any) => {
                    focusedWindow.send('href', 'back')
                }
            },
            {
                label: '登录',
                click: (item: any, focusedWindow: any) => {
                    focusedWindow.send('href', '/login')
                }
            },
            {
                label: '主页',
                click: (item: any, focusedWindow: any) => {
                    focusedWindow.send('href', '/home')
                }
            },
        ]
    }
];

function addUpdateMenuItems(items: any[], position: number) {
    if (process.mas) return;

    const version = app.getVersion();
    let updateItems: any[] = [
        {
            label: `Version ${version}`,
            enabled: false
        },
        {
            label: 'Checking for Update',
            enabled: false,
            key: 'checkingForUpdate'
        },
        {
            label: 'Check for Update',
            visible: false,
            key: 'checkForUpdate',
            click: () => {
                require('electron').autoUpdater.checkForUpdates();
            }
        },
        {
            label: 'Restart and Install Update',
            enabled: true,
            visible: false,
            key: 'restartToUpdate',
            click: () => {
                require('electron').autoUpdater.quitAndInstall();
            }
        }
    ];

    // items.splice.apply(items, [position, 0].concat(updateItems));
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu();
    if (!menu) return;
    let reopenMenuItem;
    menu.items.forEach((item: { submenu: { items: any[]; }; }) => {
        if (item.submenu) {
            item.submenu.items.forEach((item: { key: string; }) => {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item;
                }
            });
        }
    });
    return reopenMenuItem;
}

if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: `About ${name}`,
                role: 'about',
                accelerator: '',
            },
            {
                type: 'separator',
            },
            {
                label: 'Services',
                role: 'services',
                accelerator: '',
                // submenu: [],
            },
            {
                type: 'separator',
            },
            {
                label: `Hide ${name}`,
                accelerator: 'Command+H',
                role: 'hide',
            },
            {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers',
            },
            {
                label: 'Show All',
                role: 'unhide',
                accelerator: '',
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => {
                    app.quit();
                },
            },
        ]
    });

    // // Window menu.
    // template[3].submenu.push(
    //     {
    //         type: 'separator',
    //     },
    //     {
    //         label: 'Bring All to Front',
    //         role: 'front',
    //     },
    // );

    addUpdateMenuItems(template[0].submenu, 1);
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu;
    addUpdateMenuItems(helpMenu, 0);
}

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

app.on('browser-window-created', () => {
    const reopenMenuItem: any = findReopenMenuItem();
    if (reopenMenuItem) {
        reopenMenuItem.enabled = false;
    }
});

app.on('window-all-closed', () => {
    const reopenMenuItem: any = findReopenMenuItem();
    if (reopenMenuItem) {
        reopenMenuItem.enabled = true;
    }
});
