import { Author } from './.stackbit/models/Author';
import { Button } from './.stackbit/models/Button';
import { Card } from './.stackbit/models/Card';
import { CardsSection } from './.stackbit/models/CardsSection';
import { Config } from './.stackbit/models/Config';
import { Footer } from './.stackbit/models/Footer';
import { Header } from './.stackbit/models/Header';
import { HeroSection } from './.stackbit/models/HeroSection';
import { Image } from './.stackbit/models/Image';
import { Link } from './.stackbit/models/Link';
import { Page } from './.stackbit/models/Page';
import { ThemeStyle } from './.stackbit/models/ThemeStyle';
import { defineStackbitConfig } from '@stackbit/types';
import { GitContentSource } from '@stackbit/cms-git';
import { fileToUrl } from 'src/utils/content';

const sbConfig = defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ['content'],
            models: [Author, Button, Card, CardsSection, Config, Footer, Header, HeroSection, Image, Link, Page, ThemeStyle],
            assetsConfig: {
                referenceType: 'static',
                staticDir: 'public',
                uploadDir: 'images',
                publicPath: '/'
            }
        })
    ],
    siteMap: (options) => {
        const result = options.documents
            .filter((document) => document.modelName === 'Page')
            .map((document) => {
                const slugField = document.fields['slug'];
                return {
                    document,
                    urlPath: fileToUrl(document.id, slugField?.type === 'string' && slugField?.localized == false ? slugField.value : '') || ''
                };
            });
        return result;
    }
});

export default sbConfig;
