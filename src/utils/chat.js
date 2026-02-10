"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
var promises_1 = require("readline/promises");
var web_1 = require("node:stream/web");
// chat utility function that creates chat user interface on terminal
var chat = function (handler) { return __awaiter(void 0, void 0, void 0, function () {
    var rl, question, response, answer, answerText, isFirstAnswerChunk, _a, answer_1, answer_1_1, chunk, docs, sources, e_1_1;
    var _b, e_1, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                rl = (0, promises_1.createInterface)({
                    input: process.stdin,
                    output: process.stdout,
                });
                _e.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 21];
                return [4 /*yield*/, rl.question("Human: ")];
            case 2:
                question = _e.sent();
                return [4 /*yield*/, handler(question)];
            case 3:
                response = _e.sent();
                return [4 /*yield*/, response.answer];
            case 4:
                answer = _e.sent();
                answerText = "";
                if (!(answer instanceof web_1.ReadableStream)) return [3 /*break*/, 17];
                process.stdout.write("AI:");
                isFirstAnswerChunk = true;
                _e.label = 5;
            case 5:
                _e.trys.push([5, 10, 11, 16]);
                _a = true, answer_1 = (e_1 = void 0, __asyncValues(answer));
                _e.label = 6;
            case 6: return [4 /*yield*/, answer_1.next()];
            case 7:
                if (!(answer_1_1 = _e.sent(), _b = answer_1_1.done, !_b)) return [3 /*break*/, 9];
                _d = answer_1_1.value;
                _a = false;
                chunk = _d;
                if (typeof chunk === "string") {
                    // if chunk is a string response then just print it
                    process.stdout.write("".concat(chunk));
                    answerText += chunk;
                }
                else {
                    // chunk is a streamed object, find answer and print it
                    if (chunk.answer !== undefined) {
                        // if its first answer chunk then add Answer heading
                        if (isFirstAnswerChunk) {
                            process.stdout.write("Answer: ");
                            isFirstAnswerChunk = false;
                        }
                        process.stdout.write("".concat(chunk.answer));
                        answerText += chunk.answer;
                    }
                    else {
                        // for other stuff (e.g. question, context ) just print it as it is
                        console.log("".concat(JSON.stringify(chunk)));
                        if (chunk.context) {
                            docs = chunk.context;
                            sources = docs.map(function (doc) { return doc.metadata.source; });
                            console.log("Sources:\n".concat(sources.join("\n")));
                        }
                    }
                }
                _e.label = 8;
            case 8:
                _a = true;
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _e.trys.push([11, , 14, 15]);
                if (!(!_a && !_b && (_c = answer_1.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _c.call(answer_1)];
            case 12:
                _e.sent();
                _e.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16:
                console.log("\n");
                return [3 /*break*/, 18];
            case 17:
                if (typeof answer === "string") {
                    console.log("AI: ".concat(answer.trimStart()));
                    answerText = answer;
                }
                else {
                    // if LLM response is a json object then just print it
                    console.log("AI: ".concat(JSON.stringify(answer)));
                }
                _e.label = 18;
            case 18:
                // if sources are provided them print them as well
                if (response.sources) {
                    console.log("Sources:\n".concat(response.sources.join("\n")));
                }
                if (!response.answerCallBack) return [3 /*break*/, 20];
                return [4 /*yield*/, response.answerCallBack(answerText)];
            case 19:
                _e.sent();
                _e.label = 20;
            case 20: return [3 /*break*/, 1];
            case 21: return [2 /*return*/];
        }
    });
}); };
exports.chat = chat;
