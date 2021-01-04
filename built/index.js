var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from './config';
import express from 'express';
import loaders from './loaders/index';
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        yield loaders(app);
        const port = config.PORT;
        app.listen(port, () => console.log(`Listening on 0.0.0.0:${port}`));
    });
}
export default start();
