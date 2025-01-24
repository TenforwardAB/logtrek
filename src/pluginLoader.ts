/**
 * This file is licensed under the European Union Public License (EUPL) v1.2.
 * You may only use this work in compliance with the License.
 * You may obtain a copy of the License at:
 *
 * https:
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed "as is",
 * without any warranty or conditions of any kind.
 *
 * Copyright (c) 2024- Tenforward AB. All rights reserved.
 *
 * Created on 1/24/25 :: 9:36AM BY joyider <andre(-at-)sess.se>
 *
 * This file :: logger.spec.ts is part of the modulogger project.
 */

import { LoggerPlugin } from './types';
import * as path from 'path';
import * as fs from 'fs';

export function loadPlugins(): LoggerPlugin[] {
    const plugins: LoggerPlugin[] = [];

    
    const pluginsDir = path.resolve(__dirname, 'plugins');

    
    if (fs.existsSync(pluginsDir)) {
        const files = fs.readdirSync(pluginsDir).filter((file) => file.endsWith('.js'));

        for (const file of files) {
            const pluginPath = path.join(pluginsDir, file);
            const plugin = require(pluginPath); 
            if (plugin && plugin.default) {
                const pluginInstance = plugin.default as LoggerPlugin;

                
                const pluginType = path.basename(file, path.extname(file)).toLowerCase().replace('logger', '');
                (pluginInstance as any).pluginType = pluginType;

                plugins.push(pluginInstance);
            }
        }
    } else {
        console.log(`Plugins directory does not exist: ${pluginsDir}`);
    }

    return plugins;
}
