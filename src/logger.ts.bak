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

import { LogLevel, LogType, LoggerPlugin } from './types';
import { loadPlugins } from './pluginLoader';

const logLevelPriority: Record<LogLevel, number> = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    critical: 5,
};

export class Logger {
    private plugins: LoggerPlugin[] = [];
    private currentLevel: LogLevel;

    constructor(level: LogLevel, type: LogType, options: Record<string, any> = {}) {
        this.currentLevel = level;
        this.plugins = this.initializePlugins(type, options);
    }

    private initializePlugins(type: LogType, options: Record<string, any>): LoggerPlugin[] {
        const plugins = loadPlugins();
        console.log('Loaded plugins in Logger:', plugins);

        const selectedPlugin = plugins.find((plugin: any) => plugin.pluginType === type);

        if (!selectedPlugin) {
            throw new Error(`Plugin for type '${type}' not found.`);
        }

        if (selectedPlugin.configure) {
            selectedPlugin.configure(options);
        }

        return [selectedPlugin];
    }

    log(level: LogLevel, message: string, meta?: Record<string, any>) {
        if (logLevelPriority[level] >= logLevelPriority[this.currentLevel]) {
            this.plugins.forEach((plugin) => plugin.write(level, message, meta));
        }
    }

    debug(message: string, meta?: Record<string, any>) {
        this.log('debug', message, meta);
    }

    info(message: string, meta?: Record<string, any>) {
        this.log('info', message, meta);
    }

    warn(message: string, meta?: Record<string, any>) {
        this.log('warn', message, meta);
    }

    error(message: string, meta?: Record<string, any>) {
        this.log('error', message, meta);
    }

    critical(message: string, meta?: Record<string, any>) {
        this.log('critical', message, meta);
    }
}
