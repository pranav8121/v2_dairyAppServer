'use strict';

const redis = require('redis');
const config = require('./config');

class RedisClient {
    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            this.client = redis.createClient({
                host: config.redis_host || 'localhost',
                port: config.redis_port || 6379,
                retryDelayOnFailover: 100,
                maxRetriesPerRequest: 3
            });

            this.client.on('connect', () => {
                console.log('Redis client connected');
                this.isConnected = true;
            });

            this.client.on('error', (err) => {
                console.error('Redis client error:', err);
                this.isConnected = false;
            });

            this.client.on('end', () => {
                console.log('Redis client disconnected');
                this.isConnected = false;
            });

            await this.client.connect();
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    async set(key, value, expireInSeconds = null) {
        try {
            if (!this.isConnected) {
                throw new Error('Redis client is not connected');
            }

            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

            if (expireInSeconds) {
                await this.client.setEx(key, expireInSeconds, stringValue);
            } else {
                await this.client.set(key, stringValue);
            }

            return true;
        } catch (error) {
            console.error('Redis SET error:', error);
            return false;
        }
    }

    async get(key) {
        try {
            if (!this.isConnected) {
                throw new Error('Redis client is not connected');
            }

            const value = await this.client.get(key);

            if (value === null) {
                return null;
            }

            // Try to parse as JSON, if fails return as string
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (error) {
            console.error('Redis GET error:', error);
            return null;
        }
    }

    async del(key) {
        try {
            if (!this.isConnected) {
                throw new Error('Redis client is not connected');
            }

            const result = await this.client.del(key);
            return result > 0;
        } catch (error) {
            console.error('Redis DEL error:', error);
            return false;
        }
    }

    async exists(key) {
        try {
            if (!this.isConnected) {
                throw new Error('Redis client is not connected');
            }

            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.error('Redis EXISTS error:', error);
            return false;
        }
    }

    async expire(key, seconds) {
        try {
            if (!this.isConnected) {
                throw new Error('Redis client is not connected');
            }

            const result = await this.client.expire(key, seconds);
            return result === 1;
        } catch (error) {
            console.error('Redis EXPIRE error:', error);
            return false;
        }
    }

    async disconnect() {
        try {
            if (this.client) {
                await this.client.quit();
                this.isConnected = false;
            }
        } catch (error) {
            console.error('Error disconnecting from Redis:', error);
        }
    }
}

// Create singleton instance
const redisClient = new RedisClient();

module.exports = redisClient;
