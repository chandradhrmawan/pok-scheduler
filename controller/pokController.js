import { errorMessage, statusCode, successMessage } from "../helpers/statusHelpers.js"
import { getDataPok, saveRencanaKerja, delPok } from "../services/pokServices.js";
import moment from "moment";
moment.locale('id');

const getPok = async (req, res) => {
    try {
        let { revUid } = req.query
        setTimeout(async function () {
            await getDataPok(revUid);
        }, 1000);

        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        console.log(err)
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const postRencanaKerja = async (req, res) => {
    try {
        let data = req.body
        let dataRk = await saveRencanaKerja(data);
        return res.status(statusCode.success).json(successMessage(dataRk))
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

const deletePok = async (req, res) => {
    try {
        let dataPok = [{
            revUid: '6f8b5ba7-96a9-4b1c-b442-2cf2013bded1',
            pokUid: '008e85de-3902-4268-bba4-f00d7633086c',
        },
        {
            revUid: 'deb70e1c-cbc5-40f0-81dc-001f3c17f7ff',
            pokUid: '0723694b-6852-4f61-8e2d-c4bcd5f20c69',
        },
        {
            revUid: '6cf3ce34-2013-422b-9623-944d5ad86485',
            pokUid: '07362e98-f91c-4b3b-a0f1-5662241fe09d',
        }, {
            revUid: 'ffc92843-e205-49c4-824c-29bff997396b',
            pokUid: '1947c9a1-a187-4a42-911d-a0c9b1a5dca8',
        }, {
            revUid: '699ac295-2859-4402-bdae-9871339b4dab',
            pokUid: '1e1e9476-2586-4b70-b016-2ada83ce8e8d',
        }, {
            revUid: 'f331bd39-fcb7-42e4-a643-385503c8d740',
            pokUid: '221c0a5d-a114-437f-ba49-75e3e2b50975',
        }, {
            revUid: '8511989a-c954-4a19-a8ba-3b75fa46f30f',
            pokUid: '224a5e22-e65a-48ab-9912-56b7aba5880a',
        }, {
            revUid: '0b6132e3-542e-48a3-b2a4-5758ec7584ea',
            pokUid: '23df572b-bd1e-46e4-87fb-3952bb990c97',
        }, {
            revUid: 'ca0ca510-5913-443f-a846-01811e9fd4f8',
            pokUid: '28c94f8a-e21b-4dde-8f94-39da656428c9',
        }, {
            revUid: '31d8fe80-f20b-4f7c-932a-33dbf3544492',
            pokUid: '304ea5a1-8b31-4832-bb90-fad4ace89f68',
        }, {
            revUid: '46f0c05f-8051-4565-b4ba-41b7f2dcda5c',
            pokUid: '3389a245-0e73-4fda-bfc8-5f73d60a29cf',
        }, {
            revUid: 'de14b1f7-c492-4b3e-868b-7d0b15ab9245',
            pokUid: '33a251c3-93a2-494b-af66-3b4379d8f6c1',
        }, {
            revUid: 'cf4501cc-991d-44c3-9153-25e03308d3eb',
            pokUid: '365a2b96-1cc9-41e8-8fc5-ab7f36930088',
        }, {
            revUid: 'da68e55e-cfc9-460f-8df1-76e6a8b7dcf8',
            pokUid: '3aaa943c-7e5e-40aa-98fc-bd78e2bf7fa7',
        }, {
            revUid: '628f7830-9d6d-4825-8130-8413f8bf86fb',
            pokUid: '3cb18f06-bb4e-4271-b0d1-61feef28b0c8',
        }, {
            revUid: '6af964eb-fe73-40f6-b00d-16a9330d1855',
            pokUid: '3f9a2ae1-981c-46d8-80e0-71cb65d786ef',
        }, {
            revUid: '62a363aa-6f39-4622-b3b9-a92914718df0',
            pokUid: '40f8ce0a-1d07-4b15-8f29-893a73cad22d',
        }, {
            revUid: 'aaf1dda4-f8e9-4142-8325-1ba3280abd32',
            pokUid: '44844878-60b5-4ac3-a9e5-29e446d58d1f',
        }, {
            revUid: 'b8e15a50-3cd6-4f17-984b-cf64d998cc81',
            pokUid: '47f28c2a-d250-403f-904f-17dec68acf12',
        }, {
            revUid: '17cad9ec-03b7-4e7d-8d80-8a3519a00185',
            pokUid: '4823314c-6649-48b5-bc69-8d1a93c720a8',
        }, {
            revUid: 'f580a835-f9e7-4db3-96db-09bd37a67397',
            pokUid: '4a5526b1-f91a-4d5c-9159-5378dc1bc754',
        }, {
            revUid: 'd8fb3a18-68a8-499d-9a6d-2a91b7b2d4cb',
            pokUid: '4d75c954-5ebe-4984-82e3-953d2140273f',
        }, {
            revUid: '69433500-e16f-4c2b-8e50-7ce943216451',
            pokUid: '4ed1cb57-d412-4dc3-960a-3a7a642b0195',
        }, {
            revUid: '60c5d644-a348-43bf-9a7c-133326eee0e8',
            pokUid: '507b1028-05e5-4bb3-995b-95d0f1e84ec6',
        }, {
            revUid: '9069b0e4-1a06-4d54-a8a1-9072a694282d',
            pokUid: '507d3c43-29e9-4ba4-b374-012cc1d6b6b2',
        }, {
            revUid: 'e422e87a-63d3-400d-8e38-b1a6e7b0ffbc',
            pokUid: '5865bed7-022b-4756-a676-d7470e11a820',
        }, {
            revUid: '7101a3a9-7d1f-41c5-a052-d9346a5ac973',
            pokUid: '5b215921-ea83-4115-9b7a-8cf6bf1ccfdb',
        }, {
            revUid: 'b3c62659-d46b-4828-88e2-7c12badc45fe',
            pokUid: '5d6c661d-3751-4131-a5ac-d43ec11af770',
        }, {
            revUid: 'dd6f978b-1663-44d5-a461-ae1aabb0fa71',
            pokUid: '6dfc73d9-e6be-4d7e-9759-a8b72305d704',
        }, {
            revUid: '76caf5f7-31d1-4715-97b8-12e608600403',
            pokUid: '6f20a76c-bc28-450f-939a-182e220dc9f3',
        }, {
            revUid: 'a3eca519-6f4b-45d6-ae64-ce7668fca41f',
            pokUid: '740eb5d0-9ef9-4811-a22e-de776c791473',
        }, {
            revUid: 'fa3bad6a-453e-4203-b9c8-396d06ba85ba',
            pokUid: '7814e1f0-a2a4-4c01-abbc-c6dc4928b0f5',
        }, {
            revUid: '7ead2f2f-0c9f-49d5-a223-cfa0bf2e4fb7',
            pokUid: '783577ba-0a6c-4088-84bb-73c4af85b6e6',
        }, {
            revUid: '17bba0f0-b7d5-4ed3-a46e-0c43e8b16197',
            pokUid: '7cab3547-6dd1-431f-b006-be13ad98f6bd',
        }, {
            revUid: '3f770362-9a2c-489e-9e9d-2260e06c3715',
            pokUid: '7cd502f1-0b48-4b4b-9c11-821db1d95102',
        }, {
            revUid: '97067271-9313-4ad5-8a8f-7396698fe91b',
            pokUid: '7fbd8cbe-614c-4ae4-9fe5-220077a03620',
        }, {
            revUid: 'ae9fedbe-17a6-400c-b1f8-a116d53bd5bb',
            pokUid: '80afd5c0-082a-4322-ba4e-1c1664694d79',
        }, {
            revUid: 'ac314236-5ccb-4bd8-add6-1bdd12650275',
            pokUid: '82bd6c61-6093-4ca4-af81-0ac0d2682de2',
        }, {
            revUid: 'f1fc7a2c-01ca-4b5e-b600-2e268d683b5f',
            pokUid: '831cbf60-05c5-4280-9b75-1a7bb3d95e26',
        }, {
            revUid: '02fc6c9b-368f-4f10-9d9c-2a2b7158110f',
            pokUid: '84110e3c-49d6-4dc2-b86e-4fd438ebeb6d',
        }, {
            revUid: 'f914b499-679d-43bd-bfad-1724c4147535',
            pokUid: '87022f8b-99f5-4294-a0f8-ef8333736f5d',
        }, {
            revUid: 'a1224005-c480-4b74-9e2e-29234e93e5ea',
            pokUid: '91f4dca2-fc88-466c-94f8-abe19023d601',
        }, {
            revUid: 'ba457b38-dad1-4064-a3f8-c692009a5b0f',
            pokUid: '95d71e10-f59a-44ca-b86e-f6c4c32ceb7f',
        }, {
            revUid: 'e837495b-f504-475d-88df-077992da3f55',
            pokUid: '964d0d25-7ca3-4ea1-9d21-bb19c2b339e2',
        }, {
            revUid: 'd43220e9-2f86-49ef-843f-0d8ab56a1257',
            pokUid: '9aa25ae4-5238-4d45-a095-70fd66de2147',
        }, {
            revUid: 'daa6e894-31c7-43de-b5a5-e8ed4772b0db',
            pokUid: '9bbe8951-334f-48f5-983c-ab8f64008b9f',
        }, {
            revUid: '25365630-d1d0-4758-9bf9-0014e595e55c',
            pokUid: 'a1c6df19-5b95-4a52-83f9-cdf6e79d2d20',
        }, {
            revUid: '1afbe790-216a-45ea-91fc-74fda36763a2',
            pokUid: 'a3b2e08c-3d4a-44aa-b55d-680b8153cdf4',
        }, {
            revUid: 'e5bbcdbf-ae8e-4768-9c3b-db695f114bb0',
            pokUid: 'a5c99ce4-a4d8-4902-b15f-6162d6150362',
        }, {
            revUid: 'd502a8db-5fc8-4e24-9068-4969d89148e7',
            pokUid: 'a8b69d3f-4d0b-4456-bebe-b1e943b8bebe',
        }, {
            revUid: 'e048f629-2adf-4cbe-80d9-36adce8ab6e1',
            pokUid: 'aa4ca3a1-3850-453b-a287-06419ff21b81',
        }, {
            revUid: 'b8ac97c0-b946-4af6-b577-a182f396edec',
            pokUid: 'ad4da0b7-aab5-4beb-953b-ddb42e12810b',
        }, {
            revUid: '2895d2ba-04a0-4d49-8038-41bae4ca4204',
            pokUid: 'b1231d2f-263b-40af-824f-f8dfaf0b5802',
        }, {
            revUid: '1f683325-4ea2-48c8-86a9-a94342fd70be',
            pokUid: 'b26fbc49-8441-40bb-a8ff-a014298624aa',
        }, {
            revUid: '48314147-9f29-473a-9e6b-4a39c231dc16',
            pokUid: 'b37f2b81-9d7e-4d69-aa58-b56d60c11312',
        }, {
            revUid: 'c359ea2b-f6da-454e-86c1-1d55eb247dea',
            pokUid: 'b61f9d6c-a1df-4a67-8750-c096e56a8189',
        }, {
            revUid: '8ecc2f27-b8ea-4d40-8789-92fe375245a5',
            pokUid: 'ba0052da-1508-45fd-bfa6-74111fb9db56',
        }, {
            revUid: '54d085b5-8582-4a1d-87c5-f6bc64593861',
            pokUid: 'baaf13a0-4aac-459f-8779-3418ad540b02',
        }, {
            revUid: '103c24c3-1471-48aa-afcd-3675a719406a',
            pokUid: 'bc36725e-703b-49ec-b63c-7d039eab834e',
        }, {
            revUid: '0e9932f3-0493-4844-83df-fd6daa102df9',
            pokUid: 'bea7aa2c-24d2-498b-bddd-c092ae81f64b',
        }, {
            revUid: 'dbadd419-29f0-4355-b382-3d37f2e7f6c6',
            pokUid: 'c5fbcca3-f8e1-4e52-95f2-ba57748019ba',
        }, {
            revUid: '5b24462a-5761-4bd7-b2fe-8f7d7aab8f68',
            pokUid: 'c9ef7e58-1d9f-4b3b-90d5-e26566f47d2c',
        }, {
            revUid: 'e4264546-2949-43ca-b43e-6177fd999164',
            pokUid: 'ca004231-1ef8-4d2f-93cc-4d57b96c2ba2',
        }, {
            revUid: '37c2b5ba-d7e6-4198-8776-70866413d682',
            pokUid: 'cdf0611f-bae6-436b-903c-e9bab76df324',
        }, {
            revUid: 'ec07d05d-967f-4488-ac9d-29123190c7f1',
            pokUid: 'd0de6d50-9821-41e3-a4dc-f8ec1bef7d69',
        }, {
            revUid: 'db7df969-6612-491e-8c4c-7770c81d4c63',
            pokUid: 'd2228653-e99e-4c0a-89fc-64372a5af6d2',
        }, {
            revUid: 'ff420127-1f05-4cae-b51f-eb24e0e71fe2',
            pokUid: 'd23c78c5-9940-4c57-8519-3cbee8213d9b',
        }, {
            revUid: '717ea767-1c60-46aa-813c-3b2036a02fe9',
            pokUid: 'd286f2f0-779c-4e86-aa56-4f9b8f63ddf9',
        }, {
            revUid: '29f30c2c-7de0-4d4e-aa0e-5546aa30e389',
            pokUid: 'd30b64ef-8c7a-4cbe-8444-b87e894e0d1c',
        }, {
            revUid: '380d57ee-acab-48be-bb76-98c60131b30d',
            pokUid: 'd3e65e5c-4769-41f6-b27f-7f8903dc68a8',
        }, {
            revUid: '573c9980-518e-4603-bee6-acd338622b37',
            pokUid: 'd994ebc2-4e17-4241-be8e-9365c16d2cff',
        }, {
            revUid: 'ac60d386-1ddf-4c6f-8702-924c49583013',
            pokUid: 'da64cae2-ee87-492e-8adc-06561787dc14',
        }, {
            revUid: '1bdb24b6-3c73-4f46-96a7-b4f5f9625ca6',
            pokUid: 'de0ac38e-1a65-4945-ab47-441d329c9733',
        }, {
            revUid: 'add02692-f766-4101-bc91-d6cb3244b5f4',
            pokUid: 'e0b43391-a512-459b-9b19-491255824c85',
        }, {
            revUid: '9a22b5cf-189a-4000-a4af-10e4d5e921ed',
            pokUid: 'e1145b36-dfb9-4caf-9a47-eac5979ef2c1',
        }, {
            revUid: 'faa71c42-b298-4497-92d9-b71c8af252fd',
            pokUid: 'e20e2b46-bb97-4b5c-83d1-be94e89221bd',
        }, {
            revUid: 'f05e56d6-ac4a-4ec3-8a49-ae6758f528d8',
            pokUid: 'e2bf8b24-7455-41fc-8a03-dc22f07528f1',
        }, {
            revUid: '887d01e2-4a4e-4816-abf0-8866e1c4754b',
            pokUid: 'e569f9fd-d0bb-4cd3-ac18-b9e1ada63cd5',
        }, {
            revUid: 'cdbc8de5-9e14-4f6e-9524-a051d7fd4e90',
            pokUid: 'e582b12f-3076-44fa-ba1c-98298d3856de',
        }, {
            revUid: '13c44f29-1d37-4765-8c3c-679d3369368f',
            pokUid: 'e724ee5c-f8d2-42e4-bca4-4fdbd71d34bb',
        }, {
            revUid: '5da3c1d1-1690-4cfd-adc5-007ad0ef6e84',
            pokUid: 'ec0378ae-64df-4c43-9c9b-d0c5dbc70190',
        }, {
            revUid: 'f1377d57-9b14-4470-8938-fd208cfae17a',
            pokUid: 'ef56ca1f-fa06-42b6-a6f1-43070f9efd1b',
        }, {
            revUid: '7540e9b7-c486-4bc6-ab91-3856fb63e40b',
            pokUid: 'f49d252b-35ec-442e-8fe2-2234f206b341',
        }, {
            revUid: 'fb64e1fd-acc1-481d-94bc-44ad495143df',
            pokUid: 'fc1af4b8-8641-44ad-938b-f30ecf2c17b1',
        }, {
            revUid: 'b46f43fd-a7de-4f21-a522-fcb91c8dcc87',
            pokUid: 'ff42d773-bee4-4c1f-8852-09fea7aeefea',
        }]
        await delPok(dataPok);
        return res.status(statusCode.success).json(successMessage())
    } catch (err) {
        return res.status(statusCode.bad).json(errorMessage(err.message))
    }
}

export {
    getPok,
    postRencanaKerja,
    deletePok
}