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

import { LoggerPlugin, LogLevel } from '../types';
import * as fs from 'fs';
import * as path from 'path';

let logFilePath = path.resolve(process.cwd(), 'logs', 'app.log');

const fileLogger: LoggerPlugin = {
    pluginType: 'file',
    configure: (options: Record<string, any>) => {
        if (options.location) {
            logFilePath = path.resolve(process.cwd(), options.location);
            fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
        }
    },
    write: (level: LogLevel, message: string, meta?: Record<string, any>) => {
        const logEntry = `[${level.toUpperCase()}]: ${message} ${JSON.stringify(meta || {})}\n`;
        fs.appendFileSync(logFilePath, logEntry);
    },
};

export default fileLogger;
